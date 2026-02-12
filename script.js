const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxAeFV6xvwSkAUerZM00W5eKazdl2_ce22rDhkcGs7sB5KYey3Gb2Du79CW5QBD3Yl8/exec";

// --- Firebase initialization ---
// TODO: Ganti nilai di bawah ini dengan konfigurasi Firebase Anda (dapatkan dari Firebase Console -> Add Web App)
const firebaseConfig = {
    apiKey: "AIzaSyDJF0DSEOC78eotfKQ7lqYHzZ8ImWA3eSo",
    authDomain: "himatika-91e47.firebaseapp.com",
    projectId: "himatika-91e47",
    storageBucket: "himatika-91e47.firebasestorage.app",
    messagingSenderId: "81243402605",
    appId: "1:81243402605:web:8d7c57efebadf0fd5fea64",
    measurementId: "G-E55YJ3Q4WX"
};

if (typeof firebase !== 'undefined' && Object.keys(firebaseConfig).length > 0) {
    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();
} else {
    var db = null; // db akan di-set setelah user memasukkan config
}
// init auth if firebase present
var auth = (typeof firebase !== 'undefined' && firebase.auth) ? firebase.auth() : null;

let currentUser = null;
const katingList = [
      "Adinda Dwi Novitasari (2024)",
      "Ainun Mardiah (2024)",
      "Aisah Mulya Ningrum (2023)",
      "Amelia Oktaviani (2023)",
      "Amelia Putri (2024)",
      "Amelia Sugesti (2024)",
      "Amilia Fatimah Nuraini (2023)",
      "Ananda Hidayah Purnama (2023)",
      "Anastasya Aie Sabrina (2024)",
      "Angelia Saragih (2024)",
      "Angeline Christy Aruan (2023)",
      "Anggi Renata Br. Barus (2023)",
      "Aniela Lepana Putri (2024)",
      "Anisha Rahmadani Suwandi (2023)",
      "Annisa Dwi Rahmani (2024)",
      "Annisa Rahmawati (2024)",
      "Annisa Soleha Nurjannah (2024)",
      "Ariel Situmorang (2023)",
      "Artiva Nova (2023)",
      "Astri Pratiwi Margareta (2024)",
      "Asyita Pratiwi (2024)",
      "Aulia Kartika (2024)",
      "Benediktus Christiano Sihaan (2024)",
      "Boy Sihotang (2024)",
      "Citra Purba (2023)",
      "Cristiani Anjelina Purba (2023)",
      "Daffa Ihsan Naufal (2024)",
      "Daniel Manurung (2024)",
      "Daniel Yohanre Kevin Pasaribu (2024)",
      "Davina Salsabilla (2023)",
      "Dea Abelia Saskia Putri (2024)",
      "Dea Puspita (2024)",
      "Desti Puji Astuti (2023)",
      "Destri Cencya Purba (2024)",
      "Dian Monalisa Nainggolan (2023)",
      "Dian Paramita (2024)",
      "Diazti Any Dwi Herlambang (2023)",
      "Difa Dirgo Dirgantoro (2024)",
      "Dwi Dona Safitri (2024)",
      "Elsa Amalia (2023)",
      "Emiliza Oktavia Ramadani (2023)",
      "Ester Aulia Sidabutar (2023)",
      "Evan Fabiano Resdiyanto (2024)",
      "Ezy Saputra Pardosi (2024)",
      "Fabrizio Fazar Sinaga (2024)",
      "Fasih Fadillah (2024)",
      "Fazri Togatorop (2024)",
      "Febri Yurita Sari (2023)",
      "Febrianti Amelia Putri (2023)",
      "Fevbry Allenda Putri (2024)",
      "Fiqy Haziz Ibrahim (2024)",
      "Fitria Dwi Anggraini (2023)",
      "Fitriana (2024)",
      "Fitriana Sembiring (2023)",
      "Gabriella Agnes Sonia Sinaga (2024)",
      "Gizka Fadhila Husni (2023)",
      "Gloria Mischelin Rothua Septiani (2023)",
      "Herviana Octavia Rahma Dani (2024)",
      "Ima Parrona Simanjuntak (2023)",
      "Indah Puspita Rini (2024)",
      "Isnaini Az-Zahra (2024)",
      "Izdhihara Afifah (2024)",
      "Jelita Anastasha Sidabutar (2023)",
      "Jihan Fadhia Putri Hamidi (2023)",
      "Jovita Ridiana Putri (2023)",
      "Joy Patiarma Situmorang (2023)",
      "Juan Leonard Nathaniel Pello (2024)",
      "Kesya Adelina Simamora (2024)",
      "Laras Ayu Priyadi (2023)",
      "Laura Siska Amanda (2023)",
      "Leny Puspita Ningrum (2023)",
      "Lidia Rahel Saragih (2024)",
      "Luthfia Aida (2024)",
      "M. Daffa Deaz Pratama (2024)",
      "Martina Tri Mikha (2024)",
      "Muatiara Sabrina (2024)",
      "Mukhlishah Fithaah (2023)",
      "Mutiara Pardosi (2024)",
      "Nayla Nurul Aisyah (2023)",
      "Nazwa Reza Fahlevi (2024)",
      "Novia Clara Sinaga (2024)",
      "Nurma Widia Saputri (2023)",
      "Oktavia Nurvita Darmayanti (2023)",
      "Perimsa S. Pandia (2024)",
      "Pola Dwita Mariahni Sinaga (2024)",
      "Porman Sihombing (2024)",
      "Putri Adelia (2024)",
      "Putri Ratna Sari (2023)",
      "Rani Syifa Rahimarahman (2023)",
      "Rani Tiara Dewi (2023)",
      "Ridho Elyezer Sihombing (2023)",
      "Rizky Ayu Rahmawati (2024)",
      "Rolasni Rohaida Br Sidabutar (2023)",
      "Ropaska Adri Naibaho (2024)",
      "Sabela Budi Utami (2023)",
      "Safitri Dwi Utari (2023)",
      "Salsa Adhiningtias (2024)",
      "Sasi Kirana Zahrani (2023)",
      "Shefira Leli Hasanah (2023)",
      "Shintia Ronauli Simanjuntak (2024)",
      "Silvi Agustiani (2023)",
      "Silvia Dwiyanti (2024)",
      "Siska Valentina (2023)",
      "Siti Khotimah (2024)",
      "Thalia Sasi Kirana Dewi (2023)",
      "Theresia Siallagan (2024)",
      "Tianesa Marchelline Pakpahan (2023)",
      "Utari Sun P Togatorop (2024)",
      "Widya Tri Wulandari (2024)",
      "Winda Sartika Lumbantoruan (2024)",
      "Winda Suhartini Azahra (2023)"
    ];
const detingList = {
  "khayla.001": "KHAYLA AZIZAH RAHMAN",
  "della.002": "DELLA AULIA NUR SAFITRI",
  "rossa.003": "ROSSA INOVA DA SILVA",
  "salsa.004": "SALSA TIARA SEPRIANI",
  "milham.005": "M. ILHAM AL FAJRI",
  "vera.006": "VERA DWI APRILIA",
  "fauziah.007": "FAUZIAH AULIA FADILA",
  "kaysa.008": "KAYSA JULIETA PUSPITA",
  "sepia.009": "SEPIA ANGGUN SAPUTRI",
  "anabel.010": "ANABEL NOVELINA MANURUNG",
  "ririn.011": "RIRIN MARCELINA MANURUNG",
  "sopia.012": "SOPIA PAKPAHAN",
  "thessa.013": "THESSA MINARIA LUMBAN SIANTAR",
  "damar.014": "DAMAR SAPUTRA",
  "rendi.015": "RENDI ARIANTO SIHOTANG",
  "naila.016": "NAILA KHUSI ALIF VIA",
  "selvia.017": "SELVIA TIA IVANKA",
  "aldi.018": "ALDI EKO PURNAMA",
  "rama.019": "RAMA ADITIYA",
  "sabila.020": "SABILA ALLISYA PUTRI",
  "sultan.021": "SULTAN RAHMAN HADI",
  "laura.022": "LAURA NIVOLIN",
  "rika.023": "RIKA RAHAYU",
  "hani.024": "HANI SAFIRA BELA",
  "suci.025": "SUCI NAYLA SYIFA",
  "alifia.026": "ALIFIA INDAH PRATIWI",
  "nora.027": "NORA JESICA SEPTIANI SIMATUPANG",
  "aldo.028": "ALDO FEBRIANSYAH",
  "rtdewi.029": "RT.DEWI LAILATUL UMANIYYAH",
  "nurul.030": "NURUL FITRIYANI",
  "miya.031": "MIYA ARINI DAMANIK",
  "bima.032": "BIMA ALANDIKA",
  "clarista.033": "CLARISTA CHRISTY",
  "olda.034": "OLDA EYUNIKE SIAHAAN",
  "gebi.035": "GEBI MASRIDA NABABAN",
  "josua.036": "JOSUA FRANSISCO SITUMEANG",
  "grace.037": "GRACE THEODORA NATALINA MANURUNG",
  "dhea.038": "DHEA AMELIA",
  "julius.039": "JULIUS SIMAMORA",
  "fazlur.040": "FAZLUR YAZID",
  "hilarius.041": "HILARIUS JANNOELTA TARIGAN GIRSANG",
  "yuly.042": "YULY FLOWER SIREGAR",
  "priscilla.043": "PRISCILLA SYALOMITA GINTING",
  "syahira.044": "SYAHIRA LULU RAMADHANI",
  "khoirunnisaa.045": "KHOIRUNNISAA GHASSANI PUTRI",
  "azwa.046": "AZWA ARDIYANTI AMDIAH",
  "bintang.047": "BINTANG XERREND VERIXA",
  "aldi.048": "ALDI KURNIAWAN",
  "arindya.049": "ARINDYA SALSABILA AYU",
  "fara.050": "FARA DWI YUSDITA",
  "zatmiaty.051": "ZATMIATY",
  "lauren.052": "LAUREN AULIA RAMONA",
  "grace.053": "GRACE RADOTIMA SIMANJUNTAK",
  "mazmur.054": "MAZMUR SILAEN",
  "yodha.055": "YODHA IDMONIA RAZAN",
  "putri.056": "PUTRI LESTARI",
  "zeffanya.057": "ZEFFANYA MEIDIANTHA SURBAKTI",
  "selsyana.058": "SELSYANA DAMANIK",
  "hesti.059": "HESTI SAKINATUN",
  "joyanti.060": "JOYANTI GULTOM",
  "rachel.061": "RACHEL OLANDA ELIZABETH SITINJAK",
  "desya.062": "DESYA CANTIKA ANGGRAINI",
  "nayla.063": "NAYLA NUR AZIZAH",
  "wahyu.064": "WAHYU AKBAR FAJARI",
  "tiara.065": "TIARA SINAGA",
  "sinky.066": "SINKY DWI SARI TAMSAR",
  "uli.067": "ULI MUSLIHAH",
  "marwa.068": "MARWA NADYA HASANAH",
  "eukharistio.069": "EUKHARISTIO CAESATRIA WIJAYA TAMPUBOLON",
  "mrifqi.070": "M. RIFQI SAIFULLAH",
  "wulan.071": "WULAN PANCAWATI",
  "silva.072": "SILVA NOVITASARI",
  "ana.073": "ANA ESTIANI",
  "herty.074": "HERTY ROMAITO HABEAHAN",
  "aura.075": "AURA RAHMA AZKYA PUTRI",
  "nurmala.076": "NURMALA SAFITRI",
  "elisa.077": "ELISA ANGGRAINI",
  "yuko.078": "YUKO GERARD EDRA PANJAITAN",
  "ramasari.079": "RAMASARI HASIBUAN",
  "riza.080": "RIZA TRIANDINI",
  "mrasya.081": "M. RASYA AGUSTIAN",
  "vizka.082": "VIZKA AKDITYA",
  "felecia.083": "FELECIA LIDWINA BR SINAGA"
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('schedule-form').addEventListener('submit', handleAddSchedule);
    checkSession();
    // account menu handlers
    const profileBtn = document.getElementById('profile-btn');
    const accountMenu = document.getElementById('account-menu');
    if (profileBtn) {
        profileBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            toggleAccountMenu();
        });
    }
    // close menu when clicking outside
    document.addEventListener('click', (ev) => {
        if (!accountMenu) return;
        const isOpen = accountMenu.getAttribute('aria-hidden') === 'false' || accountMenu.classList.contains('active');
        if (isOpen) {
            // if click is outside account-area, close
            const area = document.getElementById('account-area');
            if (area && !area.contains(ev.target)) {
                closeAccountMenu();
            }
        }
    });
});

window.toggleTheme = () => {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    if (body.classList.contains('light-mode')) {
        body.classList.replace('light-mode', 'dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        body.classList.replace('dark-mode', 'light-mode');
        icon.classList.replace('fa-sun', 'fa-moon');
    }
};

function showPage(pageId) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        if (!auth) throw new Error('Firebase Auth belum dikonfigurasi. Masukkan firebaseConfig di script.js.');
        const userCred = await auth.signInWithEmailAndPassword(email, password);
        const now = new Date();
        const expirationTime = now.getTime() + (30 * 60 * 1000);
        const sessionData = {
            username: userCred.user.email,
            expiry: expirationTime
        };
        localStorage.setItem('userSession', JSON.stringify(sessionData));
        currentUser = userCred.user.uid;
        showPage('main-page');
        loadSchedules();
            loadDashboard();
    } catch (err) {
        alert(err.message.includes('auth/') ? 'Email atau Password salah!' : (err.message || 'Terjadi kesalahan koneksi.'));
    }
}

function checkSession() {
    // prefer Firebase auth state when available
    const sessionRaw = localStorage.getItem('userSession');
    if (auth) {
        auth.onAuthStateChanged(user => {
                if (user) {
                    currentUser = user.uid;
                    showPage('main-page');
                    loadSchedules();
                        loadDashboard();
                    updateAccountUI(user);
                } else {
                // fallback to local storage session (short-lived)
                if (!sessionRaw) {
                    showPage('login-page');
                    return;
                }
                const sessionData = JSON.parse(sessionRaw);
                const now = new Date();
                if (now.getTime() > sessionData.expiry) {
                    localStorage.removeItem('userSession');
                    currentUser = null;
                    alert('Sesi Anda telah berakhir. Silakan login kembali.');
                    showPage('login-page');
                } else {
                    currentUser = sessionData.username;
                    showPage('main-page');
                    loadSchedules();
                    updateAccountUI(sessionData.username);
                }
            }
        });
    } else {
        if (!sessionRaw) {
            showPage('login-page');
            return;
        }
        const sessionData = JSON.parse(sessionRaw);
        const now = new Date();
        if (now.getTime() > sessionData.expiry) {
            localStorage.removeItem('userSession');
            currentUser = null;
            alert('Sesi Anda telah berakhir. Silakan login kembali.');
            showPage('login-page');
        } else {
            currentUser = sessionData.username;
            showPage('main-page');
            loadSchedules();
            updateAccountUI(sessionData.username);
        }
    }
}

function updateAccountUI(userOrEmail) {
    const pic = document.getElementById('profile-pic');
    const menuPic = document.getElementById('menu-pic');
    const menuName = document.getElementById('menu-name');
    const menuEmail = document.getElementById('menu-email');
    if (!pic || !menuPic || !menuName || !menuEmail) return;
    if (userOrEmail) {
        if (typeof userOrEmail === 'string') {
            const name = userOrEmail.split('@')[0] || userOrEmail;
            menuName.textContent = name;
            menuEmail.textContent = userOrEmail && userOrEmail.includes('@') ? userOrEmail : '';
            pic.src = menuPic.src = 'https://www.gravatar.com/avatar/?d=mp&s=64';
        } else {
            const displayName = userOrEmail.displayName || (userOrEmail.email ? userOrEmail.email.split('@')[0] : 'Pengguna');
            menuName.textContent = displayName;
            menuEmail.textContent = userOrEmail.email || '';
            const photo = userOrEmail.photoURL || 'https://www.gravatar.com/avatar/?d=mp&s=64';
            pic.src = menuPic.src = photo;
        }
    } else {
        menuName.textContent = 'Pengguna';
        menuEmail.textContent = '';
        pic.src = menuPic.src = 'https://www.gravatar.com/avatar/?d=mp&s=64';
    }
}

function toggleAccountMenu() {
    const menu = document.getElementById('account-menu');
    const btn = document.getElementById('profile-btn');
    if (!menu || !btn) return;
    const isHidden = menu.getAttribute('aria-hidden') === 'true' || menu.getAttribute('aria-hidden') === null;
    if (isHidden) {
        menu.setAttribute('aria-hidden', 'false');
        menu.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
    } else {
        menu.setAttribute('aria-hidden', 'true');
        menu.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
    }
}

function closeAccountMenu() {
    const menu = document.getElementById('account-menu');
    const btn = document.getElementById('profile-btn');
    if (!menu || !btn) return;
    menu.setAttribute('aria-hidden', 'true');
    menu.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
}

async function loadSchedules() {
    const container = document.getElementById('schedule-list');
    container.innerHTML = '<p style="text-align:center">Memuat jadwal...</p>';
    try {
        if (!db) throw new Error('Firebase belum dikonfigurasi. Masukkan firebaseConfig di script.js.');
        const snapshot = await db.collection('schedules').orderBy('date', 'asc').get();
        const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        renderSchedules(data);
    } catch (err) {
        container.innerHTML = '<p>Gagal memuat data.</p>';
    }
}

function formatIndoDate(dateString) {
    if (!dateString) return "-";
    const [year, month, day] = dateString.split('-');
    const namaBulan = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ];
    const bulan = namaBulan[parseInt(month) - 1];
    return `${parseInt(day)} ${bulan} ${year}`;
}

function formatIndoTime(timeString) {
    if (!timeString) return "-";
    if (timeString.toString().includes('T')) {
        timeString = timeString.split('T')[1];
    }
    const parts = timeString.split(':');
    let hours = parts[0].trim();
    let minutes = parts[1] ? parts[1].trim() : "00";
    if (hours.length === 1) {
        hours = "0" + hours;
    }
    minutes = minutes.substring(0, 2);
    return `${hours}.${minutes}`;
}

function renderSchedules(data) {
    const container = document.getElementById('schedule-list');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align:center">Belum ada jadwal sharing.</p>';
        return;
    }

    for(const sch of data) {
        const isOwner = sch.creator === auth.currentUser.uid;
        const katingArray = Array.isArray(sch.kating) ? sch.kating : (sch.kating ? sch.kating.split(',') : []);
        const pesertaArray = Array.isArray(sch.participants) ? sch.participants : (sch.participants ? sch.participants.split(',') : []);
            const katingLines = (katingArray || []).filter(v => v && v.toString().trim() !== '').slice(0,4).map((v, i) => `<span class="kating-badge">${v.toString().trim()}</span>`);
            const katingHTML = katingLines.join('');
        // resolve creator display name (prefer saved creatorName, map via detingList if it's a local-part key)
        const creatorDisplay = sch.creatorName && detingList[sch.creatorName] ? detingList[sch.creatorName] : (sch.creatorName || '');
            // build peserta display list: map participant emails -> detingList by local-part, fallback to raw email
            const pesertaList = [(creatorDisplay || (detingList[sch.creator] ?? sch.creator)), ...pesertaArray.map(p => {
                const email = (p || '').toString().trim();
                const key = email.split('@')[0];
                return detingList[key] ?? email;
            })].slice(0, 10);
            const pesertaLines = (pesertaList || []).slice(0,10).map((v, i) => `<span class="kating-badge">${v}</span>`);
            const pesertaHTML = pesertaLines.join('');
        const card = document.createElement('div');
        card.className = 'schedule-card';
        card.innerHTML = `
            <span class="kating-label">Kating:</span>
            <div class="kating-container">
                ${katingHTML}
            </div>
            <p><i class="fas fa-calendar"></i> ${formatIndoDate(sch.date)} | <i class="fas fa-clock"></i> ${formatIndoTime(sch.time)} WIB</p>
            <p><i class="fas fa-map-marker-alt"></i> ${sch.tempat || '-'}</p>
            <span class="kating-label">Peserta:</span>
            <div class="kating-container">
                ${pesertaHTML}
            </div>
            <div class="actions" style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 10px;">
                ${isOwner ? 
                    `<div style="display:flex; gap:2px;">
                    <button class="btn-primary" onclick="deleteSch('${sch.id}')" style="background: #ff4444; color: white; border:none; padding: 8px; border-radius: 5px; cursor:pointer; width: 100%;">
                        <i class="fas fa-trash"></i> Hapus Jadwal
                    </button>
                    <button class="btn-copy" onclick="handleCopy('${sch.id}')" title="Salin teks sharing"><i class="fa fa-copy"></i></button>
                    </div>` : (() => {
                        const isParticipant = pesertaArray.includes(auth.currentUser.email);
                        const totalCount = 1 + pesertaArray.length; // creator + participants
                        if (isParticipant) {
                            return `<div style="display:flex; gap:2px;"><button class="btn-primary" onclick="leaveSch('${sch.id}')" style="flex:1; border-radius:5px; background:#ffcc00;">Batal Ikut</button><button class="btn-copy" onclick="handleCopy('${sch.id}')" title="Salin teks sharing"><i class="fas fa-clone"></i></button></div>`;
                        } else if (totalCount < 10) {
                            return `<div style="display:flex; gap:2px;"><button class="btn-primary" onclick="joinSch('${sch.id}')" style="flex:1; border-radius:5px;"> <i class="fas fa-users"></i> Ikut Sharing (${totalCount}/10)</button><button class="btn-copy" onclick="handleCopy('${sch.id}')" title="Salin teks sharing"><i class="fas fa-clone"></i></button></div>`;
                        } else {
                            return `<div style="display:flex; gap:2px;"><button class="btn-primary" disabled style="flex:1; border-radius:5px; opacity:0.6;">Penuh (${totalCount}/10)</button><button class="btn-copy" onclick="handleCopy('${sch.id}')" title="Salin teks sharing"><i class="fas fa-clone"></i></button></div>`;
                        }
                    })()
                }
            </div>
        `;
        container.appendChild(card);
    }
}

async function handleAddSchedule(e) {
    e.preventDefault();
    const newSch = {
        action: 'addSchedule',
        creator: auth.currentUser.uid,
        kating: [
            document.getElementById('kating1').value,
            document.getElementById('kating2').value,
            document.getElementById('kating3').value,
            document.getElementById('kating4').value
        ],
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        tempat: document.getElementById('tempat').value,
        files: ""
    };
    try {
        if (!db) throw new Error('Firebase belum dikonfigurasi. Masukkan firebaseConfig di script.js.');
        // simpan kating sebagai array bersih (tanpa nilai kosong)
        const katingClean = newSch.kating.filter(v => v && v.trim() !== '');
        // determine a readable creator name (use auth displayName if available)
        const creatorName = (auth && auth.currentUser && auth.currentUser.displayName)
            ? auth.currentUser.displayName
            : (auth && auth.currentUser && auth.currentUser.email)
                ? auth.currentUser.email.split('@')[0]
                : (newSch.creator || '');
        await db.collection('schedules').add({
            creator: newSch.creator,
            creatorName: creatorName,
            kating: katingClean,
            date: newSch.date,
            time: newSch.time,
            tempat: newSch.tempat,
            participants: []
        });
        hideAddForm();
        loadSchedules();
    } catch (err) {
        alert("Gagal menyimpan jadwal.");
    }
}

async function getFullname(username) {
    
}

window.deleteSch = async (id) => {
    if (confirm('Hapus jadwal ini?')) {
        try {
            if (!db) throw new Error('Firebase belum dikonfigurasi. Masukkan firebaseConfig di script.js.');
            await db.collection('schedules').doc(id).delete();
            loadSchedules();
        } catch (err) {
            alert('Gagal menghapus. ' + (err.message || ''));
        }
    }
};

window.joinSch = async (id) => {
    if (!currentUser) { alert('Silakan login terlebih dahulu.'); return; }
    try {
        if (!db) throw new Error('Firebase belum dikonfigurasi.');
        const docRef = db.collection('schedules').doc(id);
        // Use transaction to ensure limit is respected
        await db.runTransaction(async (t) => {
            const doc = await t.get(docRef);
            if (!doc.exists) throw new Error('Jadwal tidak ditemukan.');
            const data = doc.data();
            const participants = Array.isArray(data.participants) ? data.participants : [];
            const totalCount = 1 + participants.length;
            if (participants.includes(auth.currentUser.email)) return; // already joined
            if (totalCount >= 10) throw new Error('Kuota peserta telah penuh.');
            t.update(docRef, { participants: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) });
        });
        loadSchedules();
    } catch (err) {
        alert('Gagal ikut: ' + (err.message || ''));
    }
};

window.leaveSch = async (id) => {
    if (!currentUser) { alert('Silakan login terlebih dahulu.'); return; }
    if (!confirm('Batalkan keikutsertaan?')) return;
    try {
        if (!db) throw new Error('Firebase belum dikonfigurasi.');
        const docRef = db.collection('schedules').doc(id);
        await db.runTransaction(async (t) => {
            const doc = await t.get(docRef);
            if (!doc.exists) throw new Error('Jadwal tidak ditemukan.');
            const data = doc.data();
            const participants = Array.isArray(data.participants) ? data.participants : [];
            if (!participants.includes(auth.currentUser.email)) return; // nothing to do
            t.update(docRef, { participants: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) });
        });
        loadSchedules();
    } catch (err) {
        alert('Gagal batal ikut: ' + (err.message || ''));
    }
};

window.showAddForm = () => {
    document.getElementById('add-schedule-page').style.display = 'block';
    populateKatingDropdowns();
};

window.hideAddForm = () => {
    document.getElementById('add-schedule-page').style.display = 'none';
    document.getElementById('schedule-form').reset();
};

function populateKatingDropdowns() {
    const dropdowns = document.querySelectorAll('.kating-dropdown');
    dropdowns.forEach(select => {
        select.innerHTML = '<option value="">Pilih Kating</option>';
        katingList.forEach(name => {
            select.innerHTML += `<option value="${name}">${name}</option>`;
        });
    });
}

window.updateDropdowns = () => {
    const dropdowns = Array.from(document.querySelectorAll('.kating-dropdown'));
    const selectedValues = dropdowns.map(d => d.value).filter(v => v !== "");

    dropdowns.forEach(select => {
        const currentVal = select.value;
        Array.from(select.options).forEach(opt => {
            if (opt.value !== "" && opt.value !== currentVal) {
                opt.disabled = selectedValues.includes(opt.value);
            }
        });
    });
};

window.logout = async () => {
    try {
        if (auth) await auth.signOut();
    } catch (err) {
        console.warn('Sign out error', err);
    }
    localStorage.removeItem('userSession');
    currentUser = null;
    showPage('login-page');
    document.getElementById('login-form').reset();
    try { updateAccountUI(null); } catch(e){}
};

// Copy handling: build formatted share text from schedule doc and copy to clipboard
window.handleCopy = async (id) => {
    try {
        if (!db) throw new Error('Firebase belum dikonfigurasi.');
        const doc = await db.collection('schedules').doc(id).get();
        if (!doc.exists) throw new Error('Jadwal tidak ditemukan.');
        const data = doc.data();

        const katingArray = Array.isArray(data.kating) ? data.kating : (data.kating ? data.kating.split(',') : []);
        const participants = Array.isArray(data.participants) ? data.participants : [];
        // resolve creator display name (prefer creatorName then try detingList)
        const rawCreator = data.creatorName || '';
        const creatorDisplay = rawCreator && detingList[rawCreator] ? detingList[rawCreator] : (rawCreator || '');
        // build peserta list: creator first, then map participant emails -> detingList by local-part
        const pesertaList = [creatorDisplay, ...participants.map(p => {
            const email = (p || '').toString().trim();
            const key = email.split('@')[0];
            return detingList[key] ?? email;
        })].slice(0, 10);

        // build kating lines (up to 4)
        const katingLines = [];
        for (let i = 0; i < 4; i++) {
            if (katingArray[i] && katingArray[i].trim() !== '') katingLines.push(`${i+1}. ${katingArray[i].trim()}`);
            else katingLines.push(`${i+1}. `);
        }

        // build peserta lines up to 10 (pesertaList already resolved to display names)
        const pesertaLines = [];
        for (let i = 0; i < 10; i++) {
            if (pesertaList[i]) pesertaLines.push(`${i+1}. ${pesertaList[i]}`);
            else pesertaLines.push(`${i+1}. `);
        }

        const dateStr = data.date || '-';
        const timeStr = data.time || '-';
        const tempatStr = data.tempat || '-';

        const textToCopy = `Daftar sharing bersama kakak/abang:\n${katingLines.join('\n')}\n\nTanggal: ${dateStr}\nWaktu: ${timeStr}\nTempat: ${tempatStr}\n\nYang akan sharing:\n${pesertaLines.join('\n')}`;

        await copyToClipboard(textToCopy);
        alert('Teks jadwal berhasil disalin ke clipboard.');
    } catch (err) {
        alert('Gagal menyalin teks: ' + (err.message || ''));
    }
};

async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    }
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
        document.execCommand('copy');
    } finally {
        document.body.removeChild(ta);
    }
}

// Listbar + Dashboard functions
function toggleListbar() {
    const lb = document.getElementById('listbar');
    if (!lb) return;
    lb.classList.toggle('open');
}

function showTasksPage() {
    document.getElementById('listbar')?.classList.remove('open');
    // focus dashboard tasks area
    alert('Halaman Tugas: ringkasan ditampilkan pada Dashboard.');
}

function showSharingPage() {
    document.getElementById('listbar')?.classList.remove('open');
    showPage('main-page');
    loadSchedules();
}

async function loadDashboard() {
    const tugasCountEl = document.getElementById('dash-tugas-count');
    const kakakListEl = document.getElementById('dash-kakak-list');
    const hadirCountEl = document.getElementById('dash-kehadiran-count');
    if (!tugasCountEl || !kakakListEl || !hadirCountEl) return;
    try {
        if (!db || !auth || !currentUser) {
            tugasCountEl.textContent = '-';
            kakakListEl.textContent = '-';
            hadirCountEl.textContent = '-';
            return;
        }
        const userId = currentUser;
        // tasks count
        let tugasCount = 0;
        try {
            const tasksSnap = await db.collection('tasks').where('user','==',userId).where('completed','==',true).get();
            tugasCount = tasksSnap.size;
        } catch (e) { tugasCount = 0; }
        tugasCountEl.textContent = tugasCount;

        // attendance
        let hadirCount = 0;
        try {
            const hadirSnap = await db.collection('attendance').where('user','==',userId).where('present','==',true).get();
            hadirCount = hadirSnap.size;
        } catch (e) { hadirCount = 0; }
        hadirCountEl.textContent = hadirCount;

        // kakak tingkat invited (unique kating from schedules created by user)
        kakakListEl.innerHTML = '';
        try {
            const schSnap = await db.collection('schedules').where('creator','==',userId).get();
            const names = new Set();
            schSnap.forEach(doc => {
                const d = doc.data();
                const arr = Array.isArray(d.kating) ? d.kating : (d.kating ? d.kating.split(',') : []);
                arr.forEach(x => { if (x && x.toString().trim() !== '') names.add(x.toString().trim()); });
            });
            if (names.size === 0) kakakListEl.textContent = '-';
            else {
                Array.from(names).slice(0,5).forEach(n => { const el = document.createElement('div'); el.textContent = n; kakakListEl.appendChild(el); });
            }
        } catch (e) { kakakListEl.textContent = '-'; }
    } catch (err) {
        tugasCountEl.textContent = '-'; kakakListEl.textContent = '-'; hadirCountEl.textContent = '-';
    }
}
