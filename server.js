const express = require("express");
const bodyParser = require("body-parser");
const mqtt = require("mqtt");

const app = express();
app.use(bodyParser.json());

// Konfigurasi MQTT broker
const brokerUrl = "mqtt://broker.hivemq.com:1883"; // Sesuaikan URL broker kamu
const client = mqtt.connect(brokerUrl);

// Event ketika terhubung ke broker
client.on("connect", () => {
  console.log("Terhubung ke broker MQTT");
});

// Variabel untuk menyimpan data terakhir yang dikirim
let lastSentData = null;

app.get("/get-data", (req, res) => {
  if (lastSentData) {
    res.status(200).json({ success: true, data: lastSentData });
  } else {
    res
      .status(404)
      .json({ success: false, message: "Belum ada data yang dikirim" });
  }
});

// Endpoint untuk menerima data dan mengirim ke MQTT
app.post("/send-data", (req, res) => {
  const { topic, message } = req.body;

  // Simpan data yang diterima
  lastSentData = { topic, message };

  // Kirim data ke MQTT
  client.publish(topic, message, (err) => {
    if (err) {
      return res.status(500).json({ error: "Gagal mengirim data ke MQTT" });
    }
    console.log(`Data terkirim ke topic "${topic}": ${message}`);
    res
      .status(200)
      .json({ success: true, message: "Data terkirim ke MQTT dan API" });
  });
});

// Jalankan server API
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
