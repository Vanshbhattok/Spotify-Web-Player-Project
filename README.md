# 🎵 WeTunes – Spotify-Inspired Web Music Player 🎧

Welcome to **WeTunes**, a sleek and responsive music streaming web app inspired by Spotify. Built with **HTML, CSS, JavaScript, and Node.js**, this project lets you experience seamless music playback powered by **Cloudinary-hosted audio** and deployed with 💻 **Render**.

- 🔗 **Live Demo:** (https://we-tunes-online-web-player.vercel.app/)
- 🔗 **Live Demo:** (https://wetunes-online-web-player-production.up.railway.app/)
- 🔗 **Live Demo:** (https://wetunes.onrender.com/)



## 🚀 Features

- 🎧 **Play music** from curated custom playlists  
- ⏯️ **Interactive controls**: play, pause, next, previous  
- 🔊 **Volume control** + mute toggle  
- ⏱️ **Real-time progress bar** with duration tracking  
- 📁 **Dynamic playlist rendering** from backend  
- 📱 **Fully responsive** for all screen sizes  
- ☁️ **Cloud-based audio hosting** with **Cloudinary**



## 🛠️ Tech Stack

| Frontend     | Backend        |              Hosting (App)              | Media Hosting   |
|--------------|----------------|-----------------------------------------|------------------|
| HTML, CSS, JS | Node.js, Express | Vercel, Railway, Render (Free Tiers) | Cloudinary (Free Tier) |



## 📁 Folder Structure

```
WeTunes/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── utility.css
│   ├── script.js
│   └── assets/         # Icons, SVGs, images
├── server.js           # Express server
├── package.json
└── README.md
```



## 🧠 How It Works

- Express serves static frontend files from the `public/` folder.
- Songs are hosted on **Cloudinary** to avoid large file handling on GitHub or Vercel, Railway & Render.
- Playlist metadata (`info.json`) is dynamically fetched and rendered.
- On clicking a playlist card, songs load and stream directly from their Cloudinary URLs.



## 🌐 Live Preview

🖥️ **Desktop View**  

![image](https://github.com/user-attachments/assets/6a131468-bf0e-4e6d-a284-2b8fff4acf79)


📱 **Mobile View** 

![image](https://github.com/user-attachments/assets/c602bfed-64e0-4c6d-846a-29b322e84db5)




## ⚙️ Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/wetunes.git
   cd wetunes
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   node server.js
   ```
   Visit: [http://localhost:3000](http://localhost:3000)



## 🚀 Deployment Guide

### ✅ App Hosting – Vercel , Railway & Render
- Push project (without `songs/`) to GitHub
- Go to [Vercel](https://vercel.com/):  
- Go to [Railway](https://railway.com/):  
- Go to [Render](https://render.com/):  
  - New Web Service → Connect GitHub Repo
  - **Build Command:** `npm install`  
  - **Start Command:** `node server.js`

### ✅ Audio Hosting – Cloudinary
- Upload all `.mp3` files into Cloudinary folders  
- Use `video` resource type (for `.mp3`)  
- Copy secure URLs & link them in `script.js` or via `meta.json`



## ✨ Future Enhancements

- 🔁 Shuffle & Repeat functionality  
- 🔍 Search by song name or artist  
- 📱 PWA (Progressive Web App) support  
- 🗂️ Admin dashboard to upload/edit/delete tracks



## 📜 License

**MIT License** – Use it freely with attribution!



## 🙌 Special Thanks

- 💡 [CodeWithHarry](https://www.codewithharry.com/)
- 🌐 [Render](https://render.com/)
- ☁️ [Cloudinary](https://cloudinary.com/)



## 🤝 Connect

**👤 Vansh Bhatt**  
📧 Email: [vanshbhattok@gmail.com](mailto:vanshbhattok@gmail.com)  
💻 GitHub: [github.com/your-username](https://github.com/your-username)  
🎓 BTech CSE – UPES Dehradun



> 🎶 _Stream. Play. Repeat. Welcome to your very own web music experience with **WeTunes**._
