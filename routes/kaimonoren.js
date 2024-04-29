// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const kaimonorenController = require("../controllers/kaimonoRenController");

// endpoint
router.get("/", kaimonorenController.homepage); // Untuk view homepage
router.get("/kelola", kaimonorenController.kelolaProduk); // Untuk view kelola
router.post("/kelola", kaimonorenController.addProduk); // untuk menambahkan data produk
router.put("/kelola", kaimonorenController.editProduk); //untuk edit data produk
router.delete("/:id", kaimonorenController.deleteProduk); //untuk hapus data produk

// Rute untuk halaman detail produk
router.get("/detail_produk/:id", kaimonorenController.DetailProduk);

router.get("/katalog", kaimonorenController.KatalogProduk); // Untuk view katalog

// Lalu export routernya
module.exports = router;
