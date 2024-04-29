// Mengimport modul mongoose
const mongoose = require("mongoose");

// Membuat variabel baru dengan nama kaimonorenSchema
const produk = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  harga: {
    type: Number,
    required: true,
  },
  terjual: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  deskripsi: {
    type: String,
    required: true,
  },
  varian: {
    type: String,
  },
  bahan: {
    type: String,
    required: true,
  },
  stok: {
    type: Number,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  terjual: {
    type: Number,
    required: true,
  },
});


// lalu mengekspor model dari mahasiswa, tujuan mengekspor ini supaya model dari mahasiswa ini bisa digunakan dimana saja atau reusable
module.exports = mongoose.model("KaimonoRen", produk);
