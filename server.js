const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Mengaktifkan CORS untuk semua origin
app.use(
  cors({
    origin: "*",
  })
);

// Fungsi untuk menghasilkan data acak
const generateRandomData = () => {
  const nilai_suhu_max_humid_max = [];

  // Membuat data acak hanya 2 item untuk nilai_suhu_max_humid_max
  for (let i = 0; i < 2; i++) {
    // Mengatur jumlah data menjadi 2
    nilai_suhu_max_humid_max.push({
      idx: Math.floor(Math.random() * 1000),
      suhu: Math.floor(Math.random() * 20) + 20,
      humid: Math.floor(Math.random() * 50) + 50,
      kecerahan: Math.floor(Math.random() * 50),
      timestamp: new Date(new Date().getTime() - i * 3600000)
        .toISOString()
        .replace("T", " ")
        .substring(0, 19), // Mengurangi waktu 1 jam setiap item
    });
  }

  return {
    suhumax: Math.floor(Math.random() * 20) + 20,
    suhummin: Math.floor(Math.random() * 20) + 10,
    suhurata: parseFloat((Math.random() * 15 + 20).toFixed(2)),
    nilai_suhu_max_humid_max: nilai_suhu_max_humid_max, // 2 data saja
    month_year_max: [
      {
        month_year: `${Math.floor(Math.random() * 12) + 1}-${
          Math.floor(Math.random() * 5) + 2010
        }`,
      },
      {
        month_year: `${Math.floor(Math.random() * 12) + 1}-${
          Math.floor(Math.random() * 5) + 2010
        }`,
      },
    ],
  };
};

app.get("/data", (req, res) => {
  const data = generateRandomData();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
