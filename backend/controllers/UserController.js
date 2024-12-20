import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import User from "../models/UsersModels.js";

// Fungsi untuk registrasi pengguna baru atau admin
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // if (password !== confirmPassword) {
  //   return res.status(400).json({ message: "Passwords do not match" });
  // }
  // if (!name || !email || !password || !confirmPassword) {
  //   return res.status(400).json({ message: 'Semua field harus diisi' });
  // }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Validasi untuk role "admin"
    if (role === "admin") {
      // Pastikan pengguna yang mendaftar sebagai admin memiliki akses admin
      // if (!req.user || req.user.role !== "admin") {
      //   return res
      //     .status(403)
      //     .json({ message: "Only admins can create another admin" });
      // }
    }

    // Buat user baru
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

// Fungsi untuk login pengguna
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    let redirectUrl;
    if (user.role === "admin") {
      redirectUrl = "/dashboard";
    } else if (user.role === "user") {
      redirectUrl = "/home";
    }

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      redirectUrl,
      profile: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Middleware untuk melindungi rute
export const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

//mendapatkan user
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
        // password:user.password,
        role: user.role,
        profileImage: user.profileImage,
        address: user.address,
        city: user.city,
        province: user.province,
        postalCode: user.postalCode,
        country: user.country,
        phone: user.phone,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
};

//update profile
export const updateProfile = async (req, res) => {
  const { name, password } = req.body;
  const file = req.files?.profileImage;

  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update nama
    if (name) user.name = name;

    // Update password
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Update gambar profil
    if (file) {
      const uploadPath = path.join(process.cwd(), "uploads", file.name);

      // Simpan file ke folder uploads
      await file.mv(uploadPath);

      // Hapus gambar lama jika ada
      if (user.profileImage) {
        const oldImagePath = path.join(
          process.cwd(),
          "uploads",
          path.basename(user.profileImage)
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      user.profileImage = `/uploads/${file.name}`; 
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

//menambahkan dan mengupdate alamat
export const updateAddress = async (req, res) => {
  try {
    const { userId, address, city, postalCode, province, country, phone } =
      req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.address = address || user.address;
    user.city = city || user.city;
    user.postalCode = postalCode || user.postalCode;
    user.province = province || user.province;
    user.country = country || user.country;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({ message: "Address updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//mendapatkan alamat
export const getUserAddress = async (req, res) => {
  try {
    const userId = req.params.id; // Ambil ID user dari parameter URL
    const user = await User.findByPk(userId, {
      attributes: [
        "address",
        "city",
        "province",
        "postalCode",
        "country",
        "phone",
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
