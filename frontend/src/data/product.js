const products = [
  {
    id: 1,
    name: "Celana Chino",
    price: 40000,
    category: "Bawahan Pria",
    size: "M",
    img: "/assets/images/Celana Chino.jpg",
    description:
      "celana panjang  yang terbuat dari kain katun twill yang ringan dan nyaman. Cocok digunakan untuk berbagai musim dan dapat dipadukan dengan berbagai jenis pakaian. Kondisi barang tidak ada noda. tersedia warna Cream,bahan terbuat dari 100% katun twill sehingga nyaman digunakan. ",
  },
  {
    id: 2,
    name: "Celana Jeans",
    price: 50000,
    category: "Bawahan Wanita",
    size: "L",
    img: "/assets/images/Celana Jeans.jpg",
    description:
      "Celana jeans santai dengan potongan loose fit yang nyaman dan modis. Terbuat dari bahan denim berkualitas tinggi, memberikan tampilan klasik namun tetap kekinian. Sempurna untuk aktivitas sehari-hari atau acara santai. Kondisi barang sudah dibersihkan, terdapat noda kecil pada bagian atas saku. Terbuat dari bahan  Stretch denim berwarna denim.",
  },
  {
    id: 3,
    name: "Kaos Vneck Hitam",
    price: 50000,
    category: "Atasan Pria",
    size: "M",
    img: "/assets/images/Kaos Vneck Hitam.jpg",
    description:
      "Thrift Kaos V-neck adalah kaos stylish yang terbuat dari bahan katun berkualitas. Dengan desain v-neck yang modern dan warna yang netral, kaos ini cocok untuk berbagai kesempatan,sambil mendukung praktik belanja berkelanjutan. Kondisi barang sudah dibersihkan, tidak ada noda, jahitan sedikit lepas pada bagian kerah. Terbuat dari 100% katun, breathable, dan nyaman. Tersedia warna Hitam.",
  },
  {
    id: 4,
    name: "Rok A-Line",
    price: 30000,
    category: "Bawahan Wanita",
    size: "S",
    img: "/assets/images/Rok A-Line.jpg",
    description:
      "Rok A-line klasik dengan warna cream lembut yang memberikan kesan anggun dan feminin.Potongannya yang simpel membuatnya mudah dipadukan dengan berbagai atasan. Sempurna untuk acara formal maupun santai. Kondisi barang bekas, sudah di cuci, tidak ada noda. Terbuat dari 100% Sifon, tersedia warna cream.",
  },
  {
    id: 5,
    name: "Celana Pendek",
    price: 50000,
    category: "Bawahan Pria",
    size: "L",
    img: "/assets/images/Celana Pendek.jpg",
    description:
      "Celana pendek pria casual, warna abu-abu muda. Terbuat dari bahan katun yang lembut dan nyaman dipakai. Dilengkapi dua saku samping yang fungsional. Kondisi bekas sangat baik, sudah dicuci dan tidak ada noda atau kerusakan. tersedia warna abu-abu.",
  },
  {
    id: 6,
    name: "Celana Corduroy",
    price: 50000,
    category: "Bawahan Wanita",
    size: "S",
    img: "/assets/images/Celana Corduroy.jpg",
    description:
      "Celana corduroy panjang warna merah bata, bahan katun tebal yang khas. Model klasik dengan potongan straight yang timeless. Warna merah batanya memberikan kesan hangat dan stylish. Kondisi masih sangat bagus, sudah dicuci bersih dan siap pakai. Sempurna untuk tampilan retro atau casual yang kekinian.",
  },
  {
    id: 7,
    name: "Topi",
    price: 50000,
    category: "Aksesoris",
    size: "L",
    img: "/assets/images/topi.jpg",
    description:
      "Topi Trucker bekas dengan desain art corat-coret warna cream yang unik. Bahan kanvasnya tebal dan nyaman dipakai. Cocok untuk gaya kasual yang ingin tampil beda. Kondisi masih sangat bagus, sudah dicuci, tidak ada noda. ",
  },
  {
    id: 8,
    name: "Sepatu Thruffle Boots",
    price: 50000,
    category: "Aksesoris",
    size: "XL",
    img: "/assets/images/sepatu Truffle Boots.jpg",
    description:
      "Sepatu boots wanita Thruffle bekas, model ankle boots dengan warna hitam elegan. Terbuat dari kulit asli yang berkualitas tinggi, memberikan kenyamanan dan tampilan yang mewah. Sol sepatu masih bagus, tidak ada kerusakan. Sempurna untuk melengkapi berbagai outfit.. ",
  },
  {
    id: 9,
    name: "Ransel Denim",
    price: 50000,
    category: "Aksesoris",
    size: "L",
    img: "/assets/images/Ransel Denim.jpg",
    description:
      "Ransel denim wanita bekas dengan desain yang stylish. Terbuat dari bahan denim berkualitas, warna denim klasik yang tidak mudah lekang oleh waktu. Tali punggungnya yang berwarna hitam dilengkapi dengan aksen bordir yang menambah kesan vintage. Kondisi masih sangat baik, sudah di cuci, tidak ada kerusakan dan noda.",
  },
  {
    id: 10,
    name: "Celana drawstring ",
    price: 100000,
    category: "Bawahan Wanita",
    size: "L",
    img: "/assets/images/celana drawstring wanita.jpg",
    description:
      "Celana drawstring wanita bekas dengan warna cream yang kalem. Terbuat dari bahan katun yang lembut dan menyerap keringat. Desainnya yang simpel dengan tali serut (drawstring) di bagian pinggang membuat celana ini nyaman digunakan. Kondisi masih sangat baik, tidak ada noda atau kerusakan.",
  },
  {
    id: 11,
    name: "Rok Mini",
    price: 200000,
    category: "Bawahan Wanita",
    size: "M",
    img: "/assets/images/Rok Mini.jpg",
    description:
      "Rok mini kotak-kotak warna hitam merah, bahan tebal seperti wol atau tweed. Model klasik, cocok untuk gaya vintage. Kondisi masih bagus, sudah di cuci , bisa langsung pakai, tidak ada noda.",
  },
  {
    id: 12,
    name: "Cardigan",
    price: 100000,
    category: "Atasan Wanita",
    size: "XXL",
    img: "/assets/images/Cardigan.jpg",
    description:
      "Cardigan berbahan lembut dengan warna putih yang netral. Desainnya yang simpel dan klasik membuatnya mudah dipadukan dengan berbagai outfit. Cocok untuk memberikan sentuhan feminin pada penampilanmu.Terbuat dari bahan woll. kondisi barang minus pada lengan terdapat noda, sudah di cuci. ",
  },
  {
    id: 13,
    name: "Crop Top",
    price: 150000,
    category: "Atasan Wanita",
    size: "M",
    img: "/assets/images/Crop Top.jpg",
    description:
      "Crop top dengan potongan yang simpel dan modern. Bahannya yang nyaman membuatmu merasa bebas bergerak. Cocok dipadukan dengan rok mini, celana high-waist, atau bahkan jaket jeans.Terbuat dari bahan Cotton blend yang nyaman dan tahan lama. kondisi barang sudah dicuci, siap pakai, tidak ada noda.",
  },
  {
    id: 14,
    name: "Celana Formal",
    price: 200000,
    category: "Bawahan Wanita",
    size: "L",
    img: "/assets/images/Celana Formal.jpg",
    description:
      " Celana panjang dengan potongan yang formal dan elegan. Warna hitamnya yang klasik membuatnya cocok untuk berbagai acara resmi. Bahannya yang berkualitas memberikan kenyamanan saat digunakan. terbuat dari bahan Viscose.kondisi barang sudah dicuci, siap pakai, tidak ada noda.",
  },
  {
    id: 15,
    name: "Blouse",
    price: 115000,
    category: "Atasan Wanita",
    size: "XL",
    img: "/assets/images/Blouse.jpg",
    description:
      "Blouse cream dengan desain yang feminin dan elegan. Detail kancing pada bagian depan menambah kesan klasik pada blouse ini. Warna kremnya yang lembut memberikan kesan yang lembut dan anggun.Cocok untuk digunakan saat bekerja atau menghadiri acara semi-formal. terbuat dari bahan linen .kondisi barang sudah dicuci, siap pakai, tidak ada noda.",
  },
  {
    id: 16,
    name: "Hoodie",
    price: 120000,
    category: "Atasan Pria",
    size: "XL",
    img: "/assets/images/hodie.jpg",
    description:
      "Hoodie dengan warna merah marun yang klasik. Cocok untuk tampilan kasual sehari-hari atau untuk berolahraga. Hoodie ini memiliki kantong depan yang praktis untuk menyimpan barang-barang kecil.Terbuat dari bahan katun fleece. Kondisi produk bekas, sudah dicuci bersih dan siap pakaii. tersedia warna maroon",
  },
  {
    id: 17,
    name: "Kemeja Flanel",
    price: 120000,
    category: "Atasan Pria",
    size: "XXL",
    img: "/assets/images/Flanel Ralph Lauren.jpg",
    description:
      "Kemeja flanel dengan motif kotak-kotak yang timeless. Cocok untuk tampilan santai atau semi-formal. Kemeja ini memiliki potongan regular fit yang nyaman. Kombinasi kotak-kotak warna biru-putih. siap pakai ,tidak ada noda. ",
  },
  {
    id: 18,
    name: "Kemeja",
    price: 70000,
    category: "Atasan Pria",
    size: "L",
    img: "/assets/images/kemeja.jpg",
    description:
      "Kemeja polos berwarna abu-abu muda ini memberikan kesan minimalis yang elegan. Bahannya yang ringan dan lembut membuatnya nyaman digunakan sehari-hari. Cocok dipadukan dengan berbagai gaya,baik formal maupun kasual. Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 19,
    name: "Jaket Bomber",
    price: 13500,
    category: "Atasan Pria",
    size: "XL",
    img: "/assets/images/jaket bomber.jpg",
    description:
      "Jaket bomber dengan warna krem yang lembut dan tampilan yang sporty. Bahannya yang ringan dan tahan lama membuatnya ideal untuk berbagai aktivitas. Desainnya yang timeless akan selalu membuatmu tampil stylish. Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 20,
    name: "Jaket Varsity",
    price: 120000,
    category: "Atasan Pria",
    size: "XXL",
    img: "/assets/images/Jaket Varsity.jpg",
    description:
      "Jaket varsity dengan kombinasi warna hitam dan krem yang memberikan kesan retro yang stylish. Detail bordir pada bagian depan menambah kesan unik pada jaket ini. Bahannya yang tebal dan hangat akan membuatmu tetap nyaman dalam cuaca dingin. Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 21,
    name: "Sweater",
    price: 50000,
    category: "Atasan Pria",
    size: "XL",
    img: "/assets/images/Sweater cowok.jpg",
    description:
      "Sweater garis-garis hijau-putih ini terbuat dari bahan acrylic yang lembut dan tidak mudah kusut. Desainnya yang simpel membuatnya mudah dipadukan dengan berbagai gaya. Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 22,
    name: "Celana Jeans 4 saku",
    price: 75000,
    category: "Bawahan Pria",
    size: "XL",
    img: "/assets/images/Celana Jeans cowok.jpg",
    description:
      " Celana jeans denim 4 saku dengan warna biru tua yang timeless ini memberikan kesan santai namun tetap stylish. Bahan denimnya yang tebal dan kuat membuat celana ini awet digunakan. Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 23,
    name: "Celana Formal",
    price: 75000,
    category: "Bawahan Pria",
    size: "L",
    img: "/assets/images/Celana Formal cowok.jpg",
    description:
      "Celana formal hitam untuk pria ini terbuat dari bahan polyester yang halus dan licin. Potongannya yang slim fit membuat penampilanmu semakin elegan.  Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 24,
    name: "Celana Jogger",
    price: 50000,
    category: "Bawahan Pria",
    size: "XL",
    img: "/assets/images/Celana Jogger.jpg",
    description:
      "Celana jogger berwarna hitam ini sangat nyaman digunakan sehari-hari. Bahannya yang lembut dan elastis memberikan kebebasan bergerak. bahan misty.  Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },

  {
    id: 25,
    name: "Celana Cargo",
    price: 65000,
    category: "Bawahan Pria",
    size: "XL",
    img: "/assets/images/Celana Kargo.jpg",
    description:
      "Celana kargo berwarna hitam putihini memiliki banyak kantong yang praktis untuk menyimpan barang-barang kecil. Bahannya yang kuat dan tahan lama membuat celana ini cocok untuk aktivitas outdoor.Kondisi produk bekas, sudah dicuci bersih dan siap pakai",
  },
  {
    id: 26,
    name: "Celana Bot Cut",
    price: 50000,
    category: "Bawahan Pria",
    size: "XL",
    img: "/assets/images/Celana Bot Cut.jpg",
    description:
      "Celana bot cut berwarna hitam ini memberikan kesan retro yang unik. Potongannya yang mengecil di bagian bawah membuat kaki terlihat lebih jenjang. Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 27,
    name: "Dress Hitam",
    price: 160000,
    category: "Atasan Wanita",
    size: "XL",
    img: "/assets/images/Dress 1.jpg",
    description:
      "Dress hitam dengan asken warna cream pada lengan, klasik dengan potongan A-line ini terbuat dari bahan polyester yang lembut dan tidak mudah kusut. Cocok untuk acara formal maupun semi-formal. Kondisi produk bekas,sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 28,
    name: "Dress",
    price: 170000,
    category: "Atasan Wanita",
    size: "L",
    img: "/assets/images/Dress 2.jpg",
    description:
      "Dress tiered berwarna cokelat muda ini memberikan kesan manis dan feminin. Bahannya yang ringan dan nyaman membuatmu bebas bergerak. Kondisi produk bekas, sudah dicuci bersih dan siap pakai",
  },
  {
    id: 29,
    name: "Kaos",
    price: 50000,
    category: "Atasan Wanita",
    size: "M",
    img: "/assets/images/kaos cewek.jpg",
    description:
      "Kaos berwarna cream dengan potongan oversized ini sangat nyaman digunakan sehari-hari. Bahannya yang lembut dan menyerap keringat membuatmu merasa nyaman.  Kondisi produk bekas, sudah dicuci bersih dan siap pakai",
  },
  {
    id: 30,
    name: "Kemeja Flanel",
    price: 75000,
    category: "Atasan Wanita",
    size: "XL",
    img: "/assets/images/Kemeja Flanel cewek.jpg",
    description:
      "Kemeja flanel kotak-kotak ini memberikan kesan santai dan kasual. Bahannya yang hangat membuatmu tetap nyaman saat cuaca dingin.  Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 31,
    name: "Cardigan",
    price: 120000,
    category: "Atasan Wanita",
    size: "XXL",
    img: "/assets/images/Cardigan2.jpg",
    description:
      "Cardigan berwarna putih dengan detail rajutan ini memberikan kesan manis dan feminin. Bahannya yang lembut dan hangat membuatmu tetap nyaman.  Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 32,
    name: "Blouse",
    price: 60000,
    category: "Atasan Wanita",
    size: "XL",
    img: "/assets/images/Blouse3.jpg",
    description:
      " Blouse berwarna biru muda dengan detail pita ini memberikan kesan romantis. Bahannya yang lembut dan jatuh membuat penampilanmu semakin anggun.  Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 33,
    name: "Sweater",
    price: 95000,
    category: "Atasan Wanita",
    size: "XL",
    img: "/assets/images/sweater cewek.jpg",
    description:
      "Sweater berwarna putih dengan motif bunga ini memberikan kesan feminin. Bahannya yang hangat dan nyaman membuatmu tetap nyaman saat cuaca dingin.  Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 34,
    name: "Cardigan",
    price: 80000,
    category: "Atasan Wanita",
    size: "XXL",
    img: "/assets/images/cardigan3.jpg",
    description:
      "Cardigan berwarna cream dengan motif kotak-kotak ini memberikan kesan klasik. Bahannya yang lembut dan hangat membuatmu tetap nyaman.  Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 35,
    name: "Kemeja Wanita",
    price: 50000,
    category: "Atasan Wanita",
    size: "M",
    img: "/assets/images/kemeja putih.jpg",
    description:
      "Kemeja putih dengan potongan crop top ini memberikan kesan modern dan stylish. Bahannya yang ringan dan nyaman membuatmu bebas bergerak.  Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 36,
    name: "Cropped T-Shirt",
    price: 50000,
    category: "Atasan Wanita",
    size: "L",
    img: "/assets/images/Cropped T-Shirt.jpg",
    description:
      "Kaos cropped berwarna putih ini sangat cocok dipadukan dengan berbagai jenis bawahan. Bahannya yang lembut dan menyerap keringat membuatmu merasa nyaman. Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 37,
    name: "Hoodie",
    price: 60000,
    category: "Atasan Wanita",
    size: "XXL",
    img: "/assets/images/hodie cewek.jpg",
    description:
      "Hoodie berwarna cream  dengan detail pada sakunya ini memberikan kesan unik dan menarik. Bahannya yang hangat dan nyaman membuatmu tetap nyaman saat cuaca dingin.  Kondisi produk bekas, sudah dicuci bersih dan siap pakai. ",
  },
  {
    id: 38,
    name: "Celana Kulot",
    price: 70000,
    category: "Bawahan Wanita",
    size: "XL",
    img: "/assets/images/Celana Kulot.jpg",
    description:
      "Celana kulot berbahan linen berkualitas tinggi, memberikan kenyamanan maksimal. Warna krem yang netral membuatnya mudah dipadukan dengan berbagai atasan. Sudah dicuci dan siap pakai, tanpa noda atau kerusakan.",
  },
  {
    id: 39,
    name: "Rok Lipit",
    price: 55000,
    category: "Bawahan Wanita",
    size: "XL",
    img: "/assets/images/Rok Lipit.jpg",
    description:
      "Rok lipit dengan perpaduan bahan woll yang memberikan kesan mewah dan hangat. Lipatan yang rapi memberikan detail yang menarik. Warna cokelat mudanya yang timeless membuatnya mudah dipadukan dengan berbagai gaya. Produk ini telah dicuci dan siap untuk Anda kenakan.",
  },
  {
    id: 40,
    name: "Celana Calca",
    price: 150000,
    category: "Bawahan Wanita",
    size: "XXL",
    img: "/assets/images/calca denim.jpg",
    description:
      "Dapatkan tampilan casual yang keren dengan celana calca berbahan denim. Potongan lebar dan kantong samping yang fungsional membuatnya semakin stylish. Jahitan kontras berwarna putih menambah detail yang menarik. Produk ini telah dicuci dan siap untuk melengkapi gaya sehari-hari kamu.",
  },
  {
    id: 41,
    name: "Jeans Denim Boyfriend",
    price: 100000,
    category: "Bawahan Wanita",
    size: "XL",
    img: "/assets/images/Boyfriends Jeans.jpg",
    description:
      " Dapatkan tampilan santai namun tetap stylish dengan jeans boyfriend. Potongan lebar dan pinggang tinggi memberikan kenyamanan maksimal. Warna biru mudanya yang timeless mudah dipadukan dengan berbagai atasan. Produk ini telah dicuci dan siap untuk melengkapi gaya sehari-hari kamu.",
  },
  {
    id: 42,
    name: "Sepatu Truffle Boots",
    price: 122000,
    category: "Aksesoris",
    size: "",
    img: "/assets/images/sepatu Truffle Boots.jpg",
    description:
      "Sepatu boots kulit dengan desain klasik. Terbuat dari bahan kulit asli yang berkualitas tinggi, memberikan tampilan yang elegan dan tahan lama. Warna hitamnya yang netral membuatnya mudah dipadukan dengan berbagai outfit.",
  },
  {
    id: 43,
    name: "Dompet Coach Hitam",
    price: 110000,
    category: "Aksesoris",
    size: "",
    img: "/assets/images/dompet.jpg",
    description:
      "Dompet berbahan kulit dengan desain minimalis. Dilengkapi dengan beberapa slot kartu dan saku uang kertas. Warna hitamnya yang elegan membuatnya cocok untuk pria maupun wanita.",
  },
  {
    id: 44,
    name: "Sepatu GSI Rossy",
    price: 123000,
    category: "Aksesoris",
    size: "",
    img: "/assets/images/sepatu GSI Rossy.jpg",
    description:
      "Sepatu sneakers dengan desain modern dan sporty. Terbuat dari bahan kombinasi kulit sintetis dan mesh yang nyaman dan ringan. Solnya yang empuk memberikan kenyamanan saat digunakan",
  },
  {
    id: 45,
    name: "Dompet Coach",
    price: 75000,
    category: "Aksesoris",
    size: "",
    img: "/assets/images/dompet2.jpg",
    description:
      "Dompet berbahan kulit dengan desain yang unik. Dilengkapi dengan tali panjang yang membuatnya praktis dibawa. Kombinasi warna putih dan abu-abu memberikan kesan yang modern dan stylish.",
  },
  {
    id: 46,
    name: " Jam Casio Analog",
    price: 250000,
    category: "Aksesoris",
    size: "",
    img: "/assets/images/Jam Casio Analog.jpg",
    description:
      "Jam tangan analog dengan desain klasik. Terbuat dari bahan stainless steel yang tahan lama. Tali jam terbuat dari kulit asli yang nyaman di kulit.",
  },
  {
    id: 47,
    name: "Sepatu Bred AM",
    price: 250000,
    category: "Aksesoris",
    size: "",
    img: "/assets/images/sepatu Bred AM.jpg",
    description:
      "Sepatu sneakers dengan desain yang eye-catching. Terbuat dari bahan berkualitas tinggi dengan kombinasi warna yang menarik. Solnya yang tebal memberikan kenyamanan saat digunakan.",
  },
  {
    id: 48,
    name: "Kacamata",
    price: 60000,
    category: "Aksesoris",
    size: "",
    img: "/assets/images/kacamata.jpg",
    description:
      "Kacamata hitam dengan desain yang stylish. Lensa yang berkualitas memberikan perlindungan maksimal bagi mata dari sinar UV. Bingkai kacamata terbuat dari bahan yang ringan dan nyaman.",
  },
  {
    id: 49,
    name: "Topi",
    price: 87000,
    category: "Aksesoris",
    size: "",
    img: "/assets/images/kacamata.jpg",
    description:
      "Topi dengan desain klasik. Terbuat dari bahan kulit sintetis yang berkualitas. Cocok digunakan untuk melengkapi berbagai gaya outfit.",
  },
  {
    id: 50,
    name: "Jam Tangan Wellington",
    price: 300000,
    category: "Aksesoris",
    size: "",
    img: "/assets/images/jam Daniel Wellington.jpg",
    description:
      "Jam tangan dengan desain minimalis dan elegan. Terbuat dari bahan stainless steel yang tahan lama. Tali jam terbuat dari kulit asli yang nyaman di kulit.",
  },
];

export default products;
