export default async function handler(req, res) {
  // 設定允許你的網域存取 (解決 CORS)
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  
  const targetUrl = "https://www.twse.com.tw/fund/T86?response=csv&selectType=ALLBUT0999";
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });
    
    const buffer = await response.arrayBuffer();
    
    // 將 buffer 轉為 Base64 傳給前端，避開編碼問題
    const base64Data = Buffer.from(buffer).toString('base64');
    
    res.status(200).json({ data: base64Data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}