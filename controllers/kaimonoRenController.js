// Membuat variabel kaimonoren dan mengimport/required dari model kaimonoren
const KaimonoRen = require("../models/KaimonoRen");

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan ter export
module.exports = {

  // Membuat view untuk kaimonoren
  homepage: async (req, res) => {
    try {
      // Membuat variabel kaimonoren, dan menunda eksekusi hingga proses async selesai lalu mengambil model kaimonoren
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database kaimonoren
      const kaimonoren = await KaimonoRen.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel kaimonoren diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("index", {
        kaimonoren,
        alert,
        title: "Homepage", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route kaimonoren(routenya akan kita buat setelah selesai dengan kaimonorenController)
      res.redirect("/kaimonoren");
    }
  },


  // Membuat view untuk kaimonoren
  kelolaProduk: async (req, res) => {
    try {
      // Membuat variabel kaimonoren, dan menunda eksekusi hingga proses async selesai lalu mengambil model kaimonoren
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database kaimonoren
      const kaimonoren = await KaimonoRen.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel kaimonoren diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("kelola", {
        kaimonoren,
        alert,
        title: "CRUD", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route kaimonoren(routenya akan kita buat setelah selesai dengan kaimonorenController)
      res.redirect("/kaimonoren/kelola");
    }
  },

  // Membuat create data untuk kaimonoren
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  addProduk: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk nama, nim, jurusan, dan alamat yang diambil dari body/yang diketikan di form
      const { nama, harga, deskripsi, varian, bahan, stok, foto, rating, terjual } = req.body;
      // lalu mengembalikan fungsi dan membuat data dari scheme/model kaimonoren
      await KaimonoRen.create({ nama, harga, deskripsi, varian, bahan, stok, foto, rating, terjual });
      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Success add data Produk");
      req.flash("alertStatus", "success");
      res.redirect("/kaimonoren/kelola"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/kaimonoren/kelola");
    }
  },

  // Membuat update data untuk kaimonoren
  editProduk: async (req, res) => {
    try {
      // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
      const { id, nama, harga, deskripsi, varian, bahan, stok, foto, rating, terjual } = req.body;
      /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
   _id didapat database dan id isinya dari inputan user */
      const kaimonoren = await KaimonoRen.findOne({ _id: id });
      /* kaimonoren diambil dari fungsi diatas dan titik(.) nama diambil dari database = nama yang didapat dari req body
   yang tentu dikirimkan dari inputan user */
      kaimonoren.nama = nama;
      kaimonoren.harga = harga;
      kaimonoren.deskripsi = deskripsi;
      kaimonoren.varian = varian;
      kaimonoren.bahan = bahan;
      kaimonoren.stok = stok;
      kaimonoren.foto = foto;
      kaimonoren.rating = rating;
      kaimonoren.terjual = terjual;
      // Menyimpan datanya ke database
      await kaimonoren.save();
      // ketika edit data berhasill memberikan notifikasi/alert
      req.flash("alertMessage", "Success edit data produk");
      req.flash("alertStatus", "success");
      // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/kaimonoren)
      res.redirect("/kaimonoren/kelola");
    } catch (error) {
      // ketika edit data error memberikan notifikasi erronya
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong maka redirect kehalaman (/kaimonoren)
      res.redirect("/kaimonoren/kelola");
    }
  },

  // Membuat delete data untuk kaimonoren
  deleteProduk: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      // cek data kaimonoren yang mau di delete berdasarkan id
      const kaimonoren = await KaimonoRen.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await kaimonoren.deleteOne();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data Produk");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/kaimonoren/kelola");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/kaimonoren/kelola");
    }
  },

  // Membuat controller untuk halaman detail produk
  DetailProduk: async (req, res) => {
    try {
      // Mendapatkan ID produk dari parameter URL
      const { id } = req.params;
      // Mendapatkan data produk berdasarkan ID
      const product = await KaimonoRen.findOne({ _id: id });

      // Render halaman detail_produk.ejs dengan data produk
      res.render("detail_produk", { product });
    } catch (error) {
      // Tangani error jika terjadi
      res.status(500).send({ message: "Internal server error" });
    }
  },

    // Membuat view untuk kaimonoren
    KatalogProduk: async (req, res) => {
      try {
        // Membuat variabel kaimonoren, dan menunda eksekusi hingga proses async selesai lalu mengambil model kaimonoren
        // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database kaimonoren
        const kaimonoren = await KaimonoRen.find();
        // Membuat variabel untuk alertMessage  dan alertStatus
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
        const alert = { message: alertMessage, status: alertStatus };
        /**
         * Lalu render viewnya yang ada di dalam file index
         * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel kaimonoren diatas
         * Lalu merender alert yang sudah di deklar di atas
         */
        res.render("katalog", {
          kaimonoren,
          alert,
          title: "CRUD", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
        });
      } catch (error) {
        // Jika error maka akan meredirect ke route kaimonoren(routenya akan kita buat setelah selesai dengan kaimonorenController)
        res.redirect("/kaimonoren/katalog");
      }
    },
};
