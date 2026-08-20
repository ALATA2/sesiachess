/**
 * SESIA CHESS 3D & 2D PROFESSIONAL
 * Sviluppato in Three.js con logica scacchi via Chess.js ed animazioni via GSAP.
 * Include scacchiera 2D ad alta qualità in Pixel Art HD autogenerata, motore IA Minimax con Opening Book, Board Editor (Setup Mode) e Sintetizzatore Web Audio API.
 */

// ==========================================================================
// 1. CONFIGURAZIONE ASSETS (.GLB) E ANIMAZIONI 3D
// ==========================================================================

const CHESS_ASSETS = {
    white: {
        p: "", // Pedone
        r: "", // Torre
        n: "", // Cavallo
        b: "", // Alfiere
        q: "", // Regina
        k: ""  // Re
    },
    black: {
        p: "", // Pedone
        r: "", // Torre
        n: "", // Cavallo
        b: "", // Alfiere
        q: "", // Regina
        k: ""  // Re
    }
};

const ANIMATION_NAMES = {
    idle: 'idle',
    walk: 'walk',
    attack: 'attack',
    die: 'die'
};

const gltfCache = {
    white: {},
    black: {}
};

// ==========================================================================
// 2. DIZIONARIO LOCALIZZAZIONE (MULTI-LINGUA)
// ==========================================================================
const TRANSLATIONS = {
    en: {
        title: "SESIA CHESS",
        turn: "Turn: ",
        white: "WHITE",
        black: "BLACK",
        settings: "Settings",
        game_mode: "Game Mode:",
        pvp: "Player vs Player",
        pvai: "Player vs Computer",
        demo: "Demo (AI vs AI)",
        difficulty: "AI Difficulty:",
        easy: "Easy (Depth 1)",
        medium: "Medium (Depth 2)",
        hard: "Hard (Depth 3)",
        aiColor: "AI Color:",
        music: "Music:",
        sound: "Sound FX:",
        lang_label: "Language:",
        setup_title: "Board Editor",
        setup_hint: "Select a piece and click on the board (3D or 2D) to place or remove it.",
        setup_delete: "Delete",
        setup_clear: "Clear",
        setup_reset: "Reset",
        setup_turn: "Turn of:",
        setup_save: "Save & Play",
        setup_cancel: "Cancel",
        check: "CHECK!",
        checkmate: "CHECKMATE!",
        stalemate: "STALEMATE!",
        draw: "DRAW!",
        view2d: "2D View",
        view3d: "3D View",
        setup: "Edit Board",
        restart: "Restart",
        moves_title: "Moves History",
        home_subtitle: "Battle Chess Redefined",
        initial_view: "Initial View:",
        play: "PLAY GAME",
        loading_title: "Initializing Game...",
        loading_status: "Generating textures & graphics...",
        play_again: "Play Again",
        on: "ON",
        off: "OFF",
        thinking: "AI THINKING...",
        book: "AI (BOOK OPENING)...",
        pawn: "Pawn", rook: "Rook", knight: "Knight", bishop: "Bishop", queen: "Queen", king: "King",
        win_msg_white: "White has won the game by checkmate.",
        win_msg_black: "Black has won the game by checkmate.",
        draw_stalemate: "Stalemate: the active player has no legal moves.",
        draw_insufficient: "Draw: insufficient material to force checkmate.",
        draw_repetition: "Draw: three-fold repetition of position.",
        draw_general: "The game ended in a draw.",
        invalid_setup: "Invalid position! Ensure both Kings are on the board."
    },
    it: {
        title: "SESIA CHESS",
        turn: "Turno: ",
        white: "BIANCO",
        black: "NERO",
        settings: "Impostazioni",
        game_mode: "Modalità:",
        pvp: "Giocatore vs Giocatore",
        pvai: "Giocatore vs Computer",
        demo: "Demo (PC vs PC)",
        difficulty: "Difficoltà AI:",
        easy: "Facile (Prof. 1)",
        medium: "Medio (Prof. 2)",
        hard: "Difficile (Prof. 3)",
        aiColor: "Colore AI:",
        music: "Musica:",
        sound: "Effetti:",
        lang_label: "Lingua:",
        setup_title: "Editor Scacchiera",
        setup_hint: "Seleziona un pezzo e clicca sulla scacchiera (3D o 2D) per inserirlo o rimuoverlo.",
        setup_delete: "Cancella",
        setup_clear: "Svuota",
        setup_reset: "Iniziale",
        setup_turn: "Tocca a:",
        setup_save: "Salva & Gioca",
        setup_cancel: "Annulla",
        check: "SCACCO!",
        checkmate: "SCACCO MATTO!",
        stalemate: "STALLO!",
        draw: "PATTA!",
        view2d: "Vista 2D",
        view3d: "Vista 3D",
        setup: "Modifica",
        restart: "Riavvia",
        moves_title: "Storico Mosse",
        home_subtitle: "Il Fascino di Battle Chess",
        initial_view: "Vista Iniziale:",
        play: "GIOCA ORA",
        loading_title: "Inizializzazione...",
        loading_status: "Generazione texture e grafica...",
        play_again: "Rigioca",
        on: "SI",
        off: "NO",
        thinking: "AI STA PENSANDO...",
        book: "IA (APERTURA LIBRO)...",
        pawn: "Pedone", rook: "Torre", knight: "Cavallo", bishop: "Alfiere", queen: "Regina", king: "Re",
        win_msg_white: "Il Bianco ha vinto la partita per scacco matto.",
        win_msg_black: "Il Nero ha vinto la partita per scacco matto.",
        draw_stalemate: "Stallo: il giocatore di turno non ha mosse legali.",
        draw_insufficient: "Patta: materiale insufficiente per il matto.",
        draw_repetition: "Patta: ripetizione della posizione per tre volte.",
        draw_general: "La partita è terminata in parità.",
        invalid_setup: "Posizione non valida! Assicurati che entrambi i Re siano presenti sulla scacchiera."
    },
    fr: {
        title: "SESIA CHESS",
        turn: "Tour: ",
        white: "BLANC",
        black: "NOIR",
        settings: "Paramètres",
        game_mode: "Mode de jeu:",
        pvp: "Joueur contre Joueur",
        pvai: "Joueur contre Ordinateur",
        demo: "Démo (IA vs IA)",
        difficulty: "Difficulté IA:",
        easy: "Facile (Prof. 1)",
        medium: "Moyen (Prof. 2)",
        hard: "Difficile (Prof. 3)",
        aiColor: "Couleur IA:",
        music: "Musique:",
        sound: "Effets Sonores:",
        lang_label: "Langue:",
        setup_title: "Éditeur de Plateau",
        setup_hint: "Sélectionnez une pièce et cliquez sur le plateau (3D ou 2D) pour la placer ou la retirer.",
        setup_delete: "Supprimer",
        setup_clear: "Vider",
        setup_reset: "Initial",
        setup_turn: "Au tour de:",
        setup_save: "Sauver & Jouer",
        setup_cancel: "Annuler",
        check: "ÉCHEC!",
        checkmate: "ÉCHEC ET MAT!",
        stalemate: "PAT!",
        draw: "NUL!",
        view2d: "Vue 2D",
        view3d: "Vue 3D",
        setup: "Modifier",
        restart: "Recommencer",
        moves_title: "Historique",
        home_subtitle: "Battle Chess Redéfini",
        initial_view: "Vue Initiale:",
        play: "JOUER",
        loading_title: "Initialisation...",
        loading_status: "Génération de textures & graphiques...",
        play_again: "Rejouer",
        on: "OUI",
        off: "NON",
        thinking: "IA RÉFLECHIT...",
        book: "IA (OUVERTURE LIVRE)...",
        pawn: "Pion", rook: "Tour", knight: "Cavalier", bishop: "Fou", queen: "Dame", king: "Roi",
        win_msg_white: "Les Blancs ont gagné par échec et mat.",
        win_msg_black: "Les Noirs ont gagné par échec et mat.",
        draw_stalemate: "Pat: le joueur actif n'a pas de coups légaux.",
        draw_insufficient: "Nul: matériel insuffisant pour mater.",
        draw_repetition: "Nul: répétition triple de la position.",
        draw_general: "La partie s'est terminée par un match nul.",
        invalid_setup: "Position non valide! Assurez-vous que les deux Rois sont sur l'échiquier."
    },
    es: {
        title: "SESIA CHESS",
        turn: "Turno: ",
        white: "BLANCO",
        black: "NEGRO",
        settings: "Ajustes",
        game_mode: "Modo de juego:",
        pvp: "Jugador vs Jugador",
        pvai: "Jugador vs Ordenador",
        demo: "Demo (IA vs IA)",
        difficulty: "Dificultad IA:",
        easy: "Fácil (Prof. 1)",
        medium: "Medio (Prof. 2)",
        hard: "Difícil (Prof. 3)",
        aiColor: "Color de la IA:",
        music: "Música:",
        sound: "Efectos:",
        lang_label: "Idioma:",
        setup_title: "Editor de Tablero",
        setup_hint: "Selecciona una pieza y haz clic en el tablero (3D o 2D) para colocarla o quitarla.",
        setup_delete: "Eliminar",
        setup_clear: "Vaciar",
        setup_reset: "Inicial",
        setup_turn: "Turno de:",
        setup_save: "Guardar & Jugar",
        setup_cancel: "Cancelar",
        check: "JAQUE!",
        checkmate: "JAQUE MATE!",
        stalemate: "TABLAS (AHOGADO)!",
        draw: "TABLAS!",
        view2d: "Vista 2D",
        view3d: "Vista 3D",
        setup: "Modificar",
        restart: "Reiniciar",
        moves_title: "Historial",
        home_subtitle: "Battle Chess Redefinido",
        initial_view: "Vista Inicial:",
        play: "JUGAR",
        loading_title: "Inicializando...",
        loading_status: "Generando texturas y gráficos...",
        play_again: "Jugar de nuevo",
        on: "SÍ",
        off: "NO",
        thinking: "IA PENSANDO...",
        book: "IA (APERTURA LIBRO)...",
        pawn: "Peón", rook: "Torre", knight: "Caballo", bishop: "Alfil", queen: "Reina", king: "Rey",
        win_msg_white: "El Blanco ha ganado por jaque mate.",
        win_msg_black: "El Negro ha ganado por jaque mate.",
        draw_stalemate: "Ahogado: el jugador activo no tiene movimientos legales.",
        draw_insufficient: "Tablas: material insuficiente para dar mate.",
        draw_repetition: "Tablas: repetición triple de la posición.",
        draw_general: "La partida ha terminado en tablas.",
        invalid_setup: "¡Posición inválida! Asegúrese de que ambos Reyes estén en el tablero."
    },
    ja: {
        title: "SESIA CHESS",
        turn: "手番: ",
        white: "先手 (白)",
        black: "後手 (黒)",
        settings: "設定",
        game_mode: "ゲームモード:",
        pvp: "プレイヤー vs プレイヤー",
        pvai: "プレイヤー vs コンピュータ",
        demo: "デモ (AI vs AI)",
        difficulty: "AIの難易度:",
        easy: "簡単 (深さ 1)",
        medium: "普通 (深さ 2)",
        hard: "難しい (深さ 3)",
        aiColor: "AIの色:",
        music: "BGM:",
        sound: "効果音:",
        lang_label: "言語:",
        setup_title: "盤面エディター",
        setup_hint: "駒を選択し、盤面 (3Dまたは2D) をクリックして配置または削除します。",
        setup_delete: "削除",
        setup_clear: "全消去",
        setup_reset: "初期配置",
        setup_turn: "次の手番:",
        setup_save: "保存してプレイ",
        setup_cancel: "キャンセル",
        check: "王手 (チェック)!",
        checkmate: "詰み (チェックメイト)!",
        stalemate: "ステールメイト!",
        draw: "引き分け!",
        view2d: "2D 表示",
        view3d: "3D 表示",
        setup: "盤面編集",
        restart: "再起動",
        moves_title: "棋譜履歴",
        home_subtitle: "バトルチェスの再定義",
        initial_view: "初期表示:",
        play: "ゲーム開始",
        loading_title: "ゲーム初期化中...",
        loading_status: "テクスチャとグラフィックスの生成中...",
        play_again: "もう一度プレイ",
        on: "オン",
        off: "オフ",
        thinking: "AIの思考中...",
        book: "AI (定跡データベース)...",
        pawn: "ポーン", rook: "ルーク", knight: "ナイト", bishop: "ビショップ", queen: "クイーン", king: "キング",
        win_msg_white: "白がチェックメイトで勝利しました。",
        win_msg_black: "黒がチェックメイトで勝利しました。",
        draw_stalemate: "ステールメイト: 手番のプレイヤーに合法手が存在しません。",
        draw_insufficient: "引き分け: 戦力不足によりチェックメイト不能です。",
        draw_repetition: "引き分け: 同一局面が3回繰り返されました。",
        draw_general: "対局は引き分けに終わりました。",
        invalid_setup: "無効な配置です！両方のキングが盤上にあることを確認してください。"
    },
    zh: {
        title: "SESIA CHESS",
        turn: "回合: ",
        white: "白方",
        black: "黑方",
        settings: "设置",
        game_mode: "游戏模式:",
        pvp: "双人对战",
        pvai: "人机对战",
        demo: "演示 (AI对决)",
        difficulty: "AI 难度:",
        easy: "简单 (深度 1)",
        medium: "中等 (深度 2)",
        hard: "困难 (深度 3)",
        aiColor: "AI 颜色:",
        music: "音乐:",
        sound: "音效:",
        lang_label: "语言:",
        setup_title: "棋盘编辑器",
        setup_hint: "选择棋子并点击棋盘（3D 或 2D）以放置或移除它。",
        setup_delete: "删除",
        setup_clear: "清空",
        setup_reset: "重置",
        setup_turn: "本回合:",
        setup_save: "保存并开始",
        setup_cancel: "取消",
        check: "将军!",
        checkmate: "将死!",
        stalemate: "逼和!",
        draw: "和棋!",
        view2d: "2D 视图",
        view3d: "3D 视图",
        setup: "编辑棋盘",
        restart: "重新开始",
        moves_title: "历史步骤",
        home_subtitle: "战斗象棋新版定义",
        initial_view: "初始视图:",
        play: "开始游戏",
        loading_title: "初始化游戏...",
        loading_status: "正在生成纹理和图形...",
        play_again: "再玩一局",
        on: "开",
        off: "关",
        thinking: "AI 思考中...",
        book: "AI (开局库)...",
        pawn: "兵", rook: "车", knight: "马", bishop: "象", queen: "后", king: "王",
        win_msg_white: "白方通过将死赢得比赛。",
        win_msg_black: "黑方通过将死赢得比赛。",
        draw_stalemate: "逼和：当前玩家无合法移动步骤。",
        draw_insufficient: "和棋：剩余子力不足以形成将死。",
        draw_repetition: "和棋：三次重复局面。",
        draw_general: "比赛以和棋结束。",
        invalid_setup: "棋局配置无效！请确保棋盘上存在两个国王。"
    }
};

let currentLang = 'en'; // Lingua iniziale di default

// ==========================================================================
// 3. MATRICI PIXEL ART HD PER PEZZI 2D (16x16 Grids)
// ==========================================================================
const PIXEL_PIECES = {
    p: [
        "................",
        "......xxxx......",
        "....xxoooo++xx....",
        "...xxoooo++++xx...",
        "...xxo+++++ooxx...",
        "....xxo+++ooxx....",
        ".....xxoxxx......",
        "....xxo++ooxx.....",
        "...xxo++++ooxx....",
        "..xxo++++++ooxx...",
        ".xxo++++++++ooxx..",
        "xxxxxxxxxxxxxxxx",
        "................",
        "................",
        "................",
        "................"
    ],
    r: [
        "................",
        "..xx..xx..xx..xx",
        "..xxxxxxxxxxxxxx",
        "..xxo++o++o++oxx",
        "..xxo++++++++oxx",
        "...xxo++++++oxx.",
        "...xxo++++++oxx.",
        "...xxo++++++oxx.",
        "...xxo++++++oxx.",
        "..xxo++++++++oxx",
        "..xxo++++++++oxx",
        "..xxxxxxxxxxxxxx",
        "................",
        "................",
        "................",
        "................"
    ],
    n: [
        "................",
        ".....xxxxxx.....",
        "....xxoo++oxx...",
        "...xxoo+++++oxx.",
        "..xxoo++xxxxooxx",
        "..xxo+xxx..xxoxx",
        "..xxooxx....xoxx",
        "....xxx....xxoxx",
        "..........xxooxx",
        ".........xxoo+xx",
        "........xxoo++xx",
        ".......xxxxxxxx.",
        "................",
        "................",
        "................",
        "................"
    ],
    b: [
        "................",
        "......xxxx......",
        ".....xxoooxx....",
        "....xxoo++oxx...",
        "....xxo++++xx...",
        "....xxo+x++xx...",
        ".....xx+++xx....",
        ".....xxo+oxx....",
        "....xxoo++oxx...",
        "...xxoo++++oxx..",
        "..xxoo++++++oxx.",
        "..xxxxxxxxxxxxxx",
        "................",
        "................",
        "................",
        "................"
    ],
    q: [
        "................",
        "..xx..xx..xx..xx",
        "..xxxxxxxxxxxxxx",
        "..xxo+o+o+o+ooxx",
        "..xxo++++++++oxx",
        "...xxo++++++oxx.",
        "...xxo++++++oxx.",
        "...xxo++++++oxx.",
        "..xxo++++++++oxx",
        "..xxo++++++++oxx",
        ".xxo++++++++++oxx",
        "xxxxxxxxxxxxxxxx",
        "................",
        "................",
        "................",
        "................"
    ],
    k: [
        "......xx........",
        "....xxxxxx......",
        "......xx........",
        "....xxxxxx......",
        "..xxxxxxxxxxxxxx",
        "..xxo+o+o+o+ooxx",
        "..xxo++++++++oxx",
        "...xxo++++++oxx.",
        "...xxo++++++oxx.",
        "..xxo++++++++oxx",
        "..xxo++++++++oxx",
        ".xxo++++++++++oxx",
        "xxxxxxxxxxxxxxxx",
        "................",
        "................",
        "................"
    ]
};

const pieceImages2D = { w: {}, b: {} }; // Mappa URL Base64 generate all'avvio

/**
 * Genera proceduralmente le texture 2D in pixel art HD su canvas nascosti
 */
function generatePixelArtPieces() {
    const scale = 4; // Risoluzione pixel art upscalata
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Sfumature di colore per dare un aspetto professionale
    const colors = {
        w: {
            x: '#1c1b18', // Outline
            o: '#ece5d4', // Core Bianco/Crema
            '+': '#ffffff', // Highlight luce
            '.': 'transparent'
        },
        b: {
            x: '#121215', // Outline
            o: '#4d4f54', // Core Nero/Grigio metallico
            '+': '#7e838c', // Highlight luce
            '.': 'transparent'
        }
    };

    const types = ['p', 'r', 'n', 'b', 'q', 'k'];
    const colorsKeys = ['w', 'b'];

    colorsKeys.forEach(col => {
        types.forEach(type => {
            ctx.clearRect(0, 0, 64, 64);
            const grid = PIXEL_PIECES[type];
            const palette = colors[col];

            for (let y = 0; y < 16; y++) {
                for (let x = 0; x < 16; x++) {
                    const char = grid[y].charAt(x);
                    if (char !== '.' && palette[char]) {
                        ctx.fillStyle = palette[char];
                        ctx.fillRect(x * scale, y * scale, scale, scale);
                    }
                }
            }
            pieceImages2D[col][type] = canvas.toDataURL();
        });
    });
}

// ==========================================================================
// 4. SINTETIZZATORE AUDIO PROCEDURALE (WEB AUDIO API - NO EXTERNAL ASSETS)
// ==========================================================================
let audioCtx = null;
let musicInterval = null;
let musicEnabled = true;
let soundEnabled = true;

function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playSelectSound() {
    if (!soundEnabled || !audioCtx) return;
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.06);
    
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.06);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.06);
}

function playMoveSound() {
    if (!soundEnabled || !audioCtx) return;
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(260, audioCtx.currentTime + 0.25);
    
    gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
    
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
}

function playCaptureSound() {
    if (!soundEnabled || !audioCtx) return;
    initAudio();
    
    // Suono 1: colpo metallico cupo
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(35, audioCtx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
    
    // Suono 2: rumore bianco simulatore scontro
    const bufferSize = audioCtx.sampleRate * 0.25;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    
    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 850;
    
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    noise.start();
    noise.stop(audioCtx.currentTime + 0.25);
}

function playWinSound() {
    if (!soundEnabled || !audioCtx) return;
    initAudio();
    const notes = [261.63, 329.63, 392.00, 523.25]; // Do, Mi, Sol, Do (arpeggio maggiore)
    notes.forEach((freq, idx) => {
        setTimeout(() => {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
        }, idx * 90);
    });
}

function playGameOverSound() {
    if (!soundEnabled || !audioCtx) return;
    initAudio();
    const notes = [392.00, 349.23, 311.13, 261.63]; // Sol, Fa, Mib, Do (discendente minore)
    notes.forEach((freq, idx) => {
        setTimeout(() => {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.45);
        }, idx * 110);
    });
}

// Chiptune background track generator
let musicSynthSequence = [
    110, 110, 130, 110, 146, 146, 130, 165
];
let musicIndex = 0;
function startMusicLoop() {
    if (!musicEnabled) return;
    initAudio();
    if (musicInterval) clearInterval(musicInterval);
    
    musicInterval = setInterval(() => {
        if (!musicEnabled || !audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(musicSynthSequence[musicIndex], audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.38);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.38);
        
        // Aggiungi occasionalmente una nota melodica casuale (arricchimento retro)
        if (Math.random() > 0.6) {
            setTimeout(() => {
                if (!audioCtx) return;
                const melOsc = audioCtx.createOscillator();
                const melGain = audioCtx.createGain();
                melOsc.type = 'sine';
                melOsc.frequency.setValueAtTime(musicSynthSequence[musicIndex] * 4, audioCtx.currentTime);
                melGain.gain.setValueAtTime(0.012, audioCtx.currentTime);
                melGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
                melOsc.connect(melGain);
                melGain.connect(audioCtx.destination);
                melOsc.start();
                melOsc.stop(audioCtx.currentTime + 0.18);
            }, 190);
        }
        
        musicIndex = (musicIndex + 1) % musicSynthSequence.length;
    }, 400); // 150 BPM
}

function stopMusicLoop() {
    if (musicInterval) {
        clearInterval(musicInterval);
        musicInterval = null;
    }
}

// ==========================================================================
// 5. STATO DEL GIOCO E VARIABILI GLOBALI
// ==========================================================================
let scene, camera, renderer, controls;
let chess; // Istanza di Chess.js per la logica
let boardSquares3D = {}; // Mappa: 'e4' -> Mesh della tessera
let pieceMeshes = {};    // Mappa: 'e4' -> Oggetto Pezzo 3D
let mixers = [];         // Mixer attivi per le animazioni GLTF
let clock;

// Parametri di interazione 3D
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const pointerStart = new THREE.Vector2();
let selectedSquare = null;
let validMoves = [];
let isAnimating = false; // Blocca input durante mosse/attacchi
let isTopDownView = false; // Controlla se la vista 2D è attiva

// Parametri di interazione 2D
let selectedSquare2D = null;
let validMoves2D = [];

// Rilevamento Mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Dimensioni della scacchiera
const TILE_SIZE = 2;
const BOARD_OFFSET = 3.5;

// Colori dei materiali 3D
const COLOR_WHITE_TILE = 0xe8dec9;
const COLOR_BLACK_TILE = 0x2c2c35;
const COLOR_WHITE_PIECE = 0xfcf8f0;
const COLOR_BLACK_PIECE = 0x2a2d32;
const COLOR_GOLD_HIGHLIGHT = 0xe6c875;
const COLOR_BLUE_HIGHLIGHT = 0x5a9eff;
const COLOR_RED_HIGHLIGHT = 0xff5a5a;

// ==========================================================================
// 6. INIZIALIZZAZIONE GIOCO E UI INIZIALE
// ==========================================================================
window.addEventListener('DOMContentLoaded', () => {
    // 1. Genera Texture Retro in pixel art HD
    generatePixelArtPieces();
    
    // 2. Crea i motori di gioco
    initEngine();
    initChessLogic();
    buildBoard();
    build2DBoard(); // Costruisce lo scacchiere HTML per la vista 2D
    setupLights();
    
    // 3. Rilevamento ed ottimizzazioni per Mobile
    optimizeForDevice();

    // 4. Configura Eventi UI
    setupUIEvents();
    
    // Imposta la lingua predefinita su inglese all'inizio del caricamento dell'interfaccia
    setLanguage('en');
});

/**
 * Traduce gli elementi dell'interfaccia utente in base alla lingua selezionata
 */
function setLanguage(lang) {
    currentLang = lang;
    
    // Testi generici
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.innerText = TRANSLATIONS[lang][key];
        }
    });

    // Attributi title (es: bottoni palette edit)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.dataset.i18nTitle;
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
            el.title = TRANSLATIONS[lang][key];
        }
    });

    // Traduzione etichette speciali per i pezzi nelle descrizioni dei log
    sync2DBoard();
}

/**
 * Applica ottimizzazioni specifiche a seconda che sia Desktop o Mobile
 */
function optimizeForDevice() {
    if (isMobile) {
        // Disattiva comandi complessi per non interferire con il touch
        if (controls) {
            controls.enablePan = false; // Disattiva spostamento scacchiera su mobile
            controls.maxPolarAngle = Math.PI / 2.2; // Impedisce rotazioni troppo piatte
            controls.minDistance = 10;
            controls.maxDistance = 28;
        }
        
        // Regola camera iniziale per inquadrare meglio lo schermo verticale
        camera.fov = 55;
        camera.updateProjectionMatrix();
    }
}

/**
 * Configura la scena 3D di Three.js
 */
function initEngine() {
    const container = document.getElementById('canvas-container');
    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0b0f);
    scene.fog = new THREE.FogExp2(0x0b0b0f, 0.025);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputEncoding = THREE.sRGBEncoding;

    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    resetCameraPosition(false);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.minDistance = 8;
    controls.maxDistance = 35;

    window.addEventListener('resize', onWindowResize);
}

function initChessLogic() {
    chess = new Chess();
}

function setupLights() {
    const ambientLight = new THREE.AmbientLight(0xdff0ff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff8e7, 1.2);
    dirLight.position.set(8, 18, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = isMobile ? 1024 : 2048;
    dirLight.shadow.mapSize.height = isMobile ? 1024 : 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 40;
    
    const d = 12;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x7fbfff, 0.4);
    fillLight.position.set(-8, 10, -10);
    scene.add(fillLight);

    const pointLight = new THREE.PointLight(0xe6c875, 0.5, 30);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);
}

// ==========================================================================
// 7. STRUTTURA DELLE SCACCHIERE (3D E 2D)
// ==========================================================================

function buildBoard() {
    const tileGeo = new THREE.BoxGeometry(TILE_SIZE, 0.2, TILE_SIZE);
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const isLight = (r + c) % 2 === 1;
            const squareName = coordsToAlgebraic(r, c);

            const tileMat = new THREE.MeshStandardMaterial({
                color: isLight ? COLOR_WHITE_TILE : COLOR_BLACK_TILE,
                roughness: isLight ? 0.25 : 0.4,
                metalness: 0.1,
                clearcoat: 0.1,
                clearcoatRoughness: 0.1
            });

            const tile = new THREE.Mesh(tileGeo, tileMat);
            const x = (c - BOARD_OFFSET) * TILE_SIZE;
            const z = (BOARD_OFFSET - r) * TILE_SIZE;
            tile.position.set(x, 0, z);
            tile.receiveShadow = true;
            tile.userData = { square: squareName, isTile: true };
            
            scene.add(tile);
            boardSquares3D[squareName] = tile;
        }
    }

    const frameGeo = new THREE.BoxGeometry(TILE_SIZE * 8 + 0.8, 0.3, TILE_SIZE * 8 + 0.8);
    const frameMat = new THREE.MeshStandardMaterial({
        color: 0x1a0f0a,
        roughness: 0.6,
        metalness: 0.1
    });
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(0, -0.11, 0);
    frame.receiveShadow = true;
    scene.add(frame);

    createBoardLabels();
}

function createBoardLabels() {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const labelParent = new THREE.Group();

    function makeLabelTexture(text) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#101018';
        ctx.fillRect(0,0,64,64);
        ctx.fillStyle = '#e6c875';
        ctx.font = 'bold 36px Cinzel, serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 32, 32);
        
        const texture = new THREE.CanvasTexture(canvas);
        return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.4 });
    }

    const labelGeo = new THREE.PlaneGeometry(0.6, 0.6);

    for(let i=0; i<8; i++) {
        const matL = makeLabelTexture(letters[i]);
        const labelL = new THREE.Mesh(labelGeo, matL);
        labelL.position.set((i - BOARD_OFFSET) * TILE_SIZE, 0.16, (BOARD_OFFSET + 0.6) * TILE_SIZE);
        labelL.rotation.x = -Math.PI / 2;
        labelParent.add(labelL);

        const matN = makeLabelTexture((i + 1).toString());
        const labelN = new THREE.Mesh(labelGeo, matN);
        labelN.position.set(-(BOARD_OFFSET + 0.6) * TILE_SIZE, 0.16, (BOARD_OFFSET - i) * TILE_SIZE);
        labelN.rotation.x = -Math.PI / 2;
        labelN.rotation.z = Math.PI / 2;
        labelParent.add(labelN);
    }
    scene.add(labelParent);
}

/**
 * Costruisce la scacchiera 2D in pixel art HD
 */
function build2DBoard() {
    const boardDiv = document.getElementById('board-2d');
    boardDiv.innerHTML = '';

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const tile = document.createElement('div');
            const isLight = (r + c) % 2 === 0;
            tile.className = `tile-2d ${isLight ? 'tile-2d-light' : 'tile-2d-dark'}`;
            
            const squareName = coordsToAlgebraic(r, c);
            tile.dataset.square = squareName;
            
            tile.addEventListener('click', () => handle2DClick(squareName));
            boardDiv.appendChild(tile);
        }
    }
}

/**
 * Sincronizza lo stato delle tessere 2D con la scacchiera logica
 */
function sync2DBoard() {
    const boardState = chess.board();
    const tiles = document.querySelectorAll('.tile-2d');

    tiles.forEach(tile => {
        const squareName = tile.dataset.square;
        const col = squareName.charCodeAt(0) - 97;
        const row = 8 - parseInt(squareName.charAt(1));
        const piece = boardState[row][col];
        
        // Rimuovi vecchi pezzi
        const oldImg = tile.querySelector('.piece-2d');
        if (oldImg) tile.removeChild(oldImg);

        // Se c'è un pezzo, assegna la pixel art corrispondente
        if (piece) {
            const img = document.createElement('img');
            img.src = pieceImages2D[piece.color][piece.type];
            img.className = 'piece-2d';
            tile.appendChild(img);
        }
    });
}

// ==========================================================================
// 8. CARICAMENTO PEZZI 3D (FALLBACK)
// ==========================================================================

function loadAllPieces() {
    const boardState = chess.board();
    const loadPromises = [];

    for (let sq in pieceMeshes) {
        scene.remove(pieceMeshes[sq].mesh);
    }
    pieceMeshes = {};
    mixers = [];

    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = boardState[r][c];
            if (piece) {
                const squareName = coordsToAlgebraic(r, c);
                const promise = spawnPiece(piece.type, piece.color, squareName);
                loadPromises.push(promise);
            }
        }
    }

    return Promise.all(loadPromises);
}

function spawnPiece(type, color, square) {
    return new Promise((resolve) => {
        const assetColor = color === 'w' ? 'white' : 'black';
        const modelPath = CHESS_ASSETS[assetColor][type];

        if (modelPath && modelPath !== "") {
            const loader = new THREE.GLTFLoader();
            loader.load(modelPath, 
                (gltf) => {
                    const cloned = cloneGltf(gltf);
                    const mesh = cloned.scene;
                    
                    mesh.traverse(child => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });

                    let mixer = null;
                    let animationsMap = {};
                    if (cloned.animations && cloned.animations.length > 0) {
                        mixer = new THREE.AnimationMixer(mesh);
                        mixers.push(mixer);
                        cloned.animations.forEach(clip => {
                            animationsMap[clip.name] = clip;
                        });
                    }

                    setupPieceTransform(mesh, square, color);
                    
                    pieceMeshes[square] = {
                        mesh: mesh,
                        type: type,
                        color: color,
                        mixer: mixer,
                        animations: animationsMap,
                        activeAction: null,
                        isFallback: false
                    };
                    
                    scene.add(mesh);
                    playPieceAnimation(pieceMeshes[square], ANIMATION_NAMES.idle);
                    resolve();
                },
                (xhr) => {
                    if (xhr.total > 0) {
                        const pct = (xhr.loaded / xhr.total) * 100;
                        document.getElementById('progress-bar').style.width = pct + '%';
                    }
                },
                (error) => {
                    console.warn(`Errore GLB. Carico fallback per ${type} (${color}).`, error);
                    fallbackPieceInstantiation(type, color, square);
                    resolve();
                }
            );
        } else {
            fallbackPieceInstantiation(type, color, square);
            resolve();
        }
    });
}

function fallbackPieceInstantiation(type, color, square) {
    const mesh = createFallbackGeometry(type, color);
    setupPieceTransform(mesh, square, color);
    
    pieceMeshes[square] = {
        mesh: mesh,
        type: type,
        color: color,
        mixer: null,
        animations: {},
        activeAction: null,
        isFallback: true
    };
    
    scene.add(mesh);
}

function setupPieceTransform(mesh, square, color) {
    const coords = algebraicToCoords(square);
    mesh.position.set(coords.x, 0.1, coords.z);
    mesh.rotation.y = color === 'w' ? Math.PI : 0;
    mesh.userData = { square: square, isPiece: true };
}

function createFallbackGeometry(type, color) {
    const group = new THREE.Group();
    const colHex = color === 'w' ? COLOR_WHITE_PIECE : COLOR_BLACK_PIECE;
    const rough = color === 'w' ? 0.15 : 0.3;
    const metal = color === 'w' ? 0.1 : 0.25;

    const material = new THREE.MeshStandardMaterial({
        color: colHex,
        roughness: rough,
        metalness: metal,
        clearcoat: 0.2,
        clearcoatRoughness: 0.1
    });

    let bodyGeo;
    let height = 1.0;

    const baseGeo = new THREE.CylinderGeometry(0.6, 0.7, 0.2, 16);
    const baseMesh = new THREE.Mesh(baseGeo, material);
    baseMesh.position.y = 0.1;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    group.add(baseMesh);

    switch (type) {
        case 'p':
            height = 1.1;
            bodyGeo = new THREE.CylinderGeometry(0.3, 0.5, 0.7, 16);
            const bodyP = new THREE.Mesh(bodyGeo, material);
            bodyP.position.y = 0.55;
            const headGeo = new THREE.SphereGeometry(0.35, 16, 16);
            const headP = new THREE.Mesh(headGeo, material);
            headP.position.y = 1.0;
            group.add(bodyP, headP);
            break;

        case 'r':
            height = 1.4;
            bodyGeo = new THREE.CylinderGeometry(0.45, 0.55, 1.0, 16);
            const bodyR = new THREE.Mesh(bodyGeo, material);
            bodyR.position.y = 0.7;
            const topR = new THREE.CylinderGeometry(0.55, 0.45, 0.25, 16);
            const topMeshR = new THREE.Mesh(topR, material);
            topMeshR.position.y = 1.3;
            group.add(bodyR, topMeshR);
            break;

        case 'n':
            height = 1.5;
            bodyGeo = new THREE.CylinderGeometry(0.4, 0.5, 0.9, 16);
            const bodyN = new THREE.Mesh(bodyGeo, material);
            bodyN.position.y = 0.65;
            
            const headNGeo = new THREE.BoxGeometry(0.4, 0.5, 0.75);
            const headN = new THREE.Mesh(headNGeo, material);
            headN.position.set(0, 1.2, 0.15);
            headN.rotation.x = -0.2;
            
            const earsNGeo = new THREE.ConeGeometry(0.1, 0.3, 4);
            const earL = new THREE.Mesh(earsNGeo, material);
            earL.position.set(-0.15, 1.5, -0.1);
            const earR = new THREE.Mesh(earsNGeo, material);
            earR.position.set(0.15, 1.5, -0.1);
            
            group.add(bodyN, headN, earL, earR);
            break;

        case 'b':
            height = 1.7;
            bodyGeo = new THREE.CylinderGeometry(0.3, 0.5, 1.1, 16);
            const bodyB = new THREE.Mesh(bodyGeo, material);
            bodyB.position.y = 0.75;
            
            const headBGeo = new THREE.ConeGeometry(0.35, 0.7, 16);
            const headB = new THREE.Mesh(headBGeo, material);
            headB.position.y = 1.45;
            
            const tipBGeo = new THREE.SphereGeometry(0.1, 8, 8);
            const tipB = new THREE.Mesh(tipBGeo, material);
            tipB.position.y = 1.85;
            
            group.add(bodyB, headB, tipB);
            break;

        case 'q':
            height = 2.1;
            bodyGeo = new THREE.CylinderGeometry(0.35, 0.6, 1.4, 16);
            const bodyQ = new THREE.Mesh(bodyGeo, material);
            bodyQ.position.y = 0.9;
            
            const crownQGeo = new THREE.TorusGeometry(0.38, 0.15, 8, 24);
            const crownQ = new THREE.Mesh(crownQGeo, material);
            crownQ.position.y = 1.7;
            crownQ.rotation.x = Math.PI / 2;
            
            const tipQGeo = new THREE.SphereGeometry(0.15, 8, 8);
            const tipQ = new THREE.Mesh(tipQGeo, material);
            tipQ.position.y = 2.0;
            
            group.add(bodyQ, crownQ, tipQ);
            break;

        case 'k':
            height = 2.3;
            bodyGeo = new THREE.CylinderGeometry(0.38, 0.6, 1.5, 16);
            const bodyK = new THREE.Mesh(bodyGeo, material);
            bodyK.position.y = 0.95;
            
            const crownKGeo = new THREE.CylinderGeometry(0.5, 0.4, 0.3, 16);
            const crownK = new THREE.Mesh(crownKGeo, material);
            crownK.position.y = 1.85;
            
            const crossGroup = new THREE.Group();
            const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.4, 0.12), material);
            const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.12), material);
            crossV.position.y = 2.15;
            crossH.position.y = 2.22;
            crossGroup.add(crossV, crossH);
            
            group.add(bodyK, crownK, crossGroup);
            break;
    }

    group.traverse(child => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    return group;
}

function cloneGltf(gltf) {
    const clone = {
        scene: gltf.scene.clone(),
        animations: gltf.animations
    };
    
    const skinnedMeshes = {};
    gltf.scene.traverse(node => {
        if (node.isSkinnedMesh) {
            skinnedMeshes[node.name] = node;
        }
    });
    
    clone.scene.traverse(node => {
        if (node.isSkinnedMesh) {
            const originalMesh = skinnedMeshes[node.name];
            if (originalMesh) {
                node.geometry = originalMesh.geometry;
                node.material = originalMesh.material;
                node.skeleton = originalMesh.skeleton.clone();
                
                const cloneBones = {};
                clone.scene.traverse(cloneNode => {
                    if (cloneNode.isBone) cloneBones[cloneNode.name] = cloneNode;
                });
                
                const bones = [];
                for (let i = 0; i < originalMesh.skeleton.bones.length; i++) {
                    const boneName = originalMesh.skeleton.bones[i].name;
                    bones.push(cloneBones[boneName] || originalMesh.skeleton.bones[i]);
                }
                node.bind(new THREE.Skeleton(bones, originalMesh.skeleton.boneInverses), node.matrixWorld);
            }
        }
    });
    
    return clone;
}

// ==========================================================================
// 9. ANIMATIONS, MOVES & COMBATS
// ==========================================================================

function playPieceAnimation(piece, animationName, loop = true) {
    if (!piece) return;

    if (piece.mixer && piece.animations[animationName]) {
        const clip = piece.animations[animationName];
        const action = piece.mixer.clipAction(clip);
        
        if (!loop) {
            action.loop = THREE.LoopOnce;
            action.clampWhenFinished = true;
        } else {
            action.loop = THREE.LoopRepeat;
        }

        if (piece.activeAction && piece.activeAction !== action) {
            piece.activeAction.fadeOut(0.2);
            action.reset().fadeIn(0.2).play();
        } else {
            action.play();
        }
        piece.activeAction = action;
    }
}

function executeMove3D(fromSq, toSq, moveLogInfo) {
    isAnimating = true;
    
    const movingPiece = pieceMeshes[fromSq];
    const targetPiece = pieceMeshes[toSq];

    const coordsA = algebraicToCoords(fromSq);
    const coordsB = algebraicToCoords(toSq);

    delete pieceMeshes[fromSq];

    if (targetPiece) {
        // CATTURA CON COMBATTIMENTO
        const angle = Math.atan2(coordsB.z - coordsA.z, coordsB.x - coordsA.x);
        const stopDistance = 0.8; 
        const combatPosX = coordsB.x - Math.cos(angle) * stopDistance;
        const combatPosZ = coordsB.z - Math.sin(angle) * stopDistance;

        movingPiece.mesh.lookAt(new THREE.Vector3(coordsB.x, movingPiece.mesh.position.y, coordsB.z));
        targetPiece.mesh.lookAt(new THREE.Vector3(coordsA.x, targetPiece.mesh.position.y, coordsA.z));

        playPieceAnimation(movingPiece, ANIMATION_NAMES.walk);
        
        const walkDuration = 1.2;
        const tl = gsap.timeline({
            onComplete: () => {
                playPieceAnimation(movingPiece, ANIMATION_NAMES.attack, false);
                
                gsap.delayedCall(0.5, () => {
                    playCaptureSound(); // Riproduce suono scontro procedurale
                    playPieceAnimation(targetPiece, ANIMATION_NAMES.die, false);
                    
                    if (targetPiece.isFallback) {
                        gsap.to(targetPiece.mesh.rotation, { x: Math.PI / 2, z: Math.PI / 4, duration: 0.6 });
                        gsap.to(targetPiece.mesh.position, { y: -3, duration: 0.8, ease: "power2.in" });
                        gsap.to(targetPiece.mesh.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.8, onComplete: cleanupTarget });
                    } else {
                        gsap.delayedCall(1.2, cleanupTarget);
                    }
                });
            }
        });

        tl.to(movingPiece.mesh.position, { x: combatPosX, z: combatPosZ, duration: walkDuration, ease: "power1.inOut" });
        if (movingPiece.isFallback) {
            tl.to(movingPiece.mesh.position, { y: 0.8, duration: walkDuration / 4, yoyo: true, repeat: 3, ease: "power1.out" }, 0);
        }

        function cleanupTarget() {
            scene.remove(targetPiece.mesh);
            if (targetPiece.mixer) {
                const idx = mixers.indexOf(targetPiece.mixer);
                if (idx > -1) mixers.splice(idx, 1);
            }
            
            playPieceAnimation(movingPiece, ANIMATION_NAMES.walk);
            
            const stepFinal = gsap.timeline({
                onComplete: () => {
                    gsap.to(movingPiece.mesh.rotation, {
                        y: movingPiece.color === 'w' ? Math.PI : 0,
                        duration: 0.3,
                        onComplete: () => {
                            playPieceAnimation(movingPiece, ANIMATION_NAMES.idle);
                            finalizeState();
                        }
                    });
                }
            });

            stepFinal.to(movingPiece.mesh.position, { x: coordsB.x, z: coordsB.z, duration: 0.4, ease: "power1.out" });
            if (movingPiece.isFallback) {
                stepFinal.to(movingPiece.mesh.position, { y: 0.1, duration: 0.4, ease: "bounce.out" }, 0);
            }
        }

    } else {
        // MOVIMENTO PACIFICO
        playMoveSound(); // Riproduce suono mossa
        playPieceAnimation(movingPiece, ANIMATION_NAMES.walk);
        
        const moveDuration = 0.8;
        const tl = gsap.timeline({
            onComplete: () => {
                playPieceAnimation(movingPiece, ANIMATION_NAMES.idle);
                finalizeState();
            }
        });

        tl.to(movingPiece.mesh.position, { x: coordsB.x, z: coordsB.z, duration: moveDuration, ease: "power2.inOut" }, 0);
        tl.to(movingPiece.mesh.position, { y: 1.0, duration: moveDuration / 2, yoyo: true, repeat: 1, ease: "power1.out" }, 0);
    }

    function finalizeState() {
        movingPiece.mesh.userData.square = toSq;
        pieceMeshes[toSq] = movingPiece;
        
        // Esegui la mossa logica
        chess.move({ from: fromSq, to: toSq, promotion: 'q' });

        syncSpecialMoves(fromSq, toSq);
        
        // Aggiorna e sincronizza scacchiera 2D
        sync2DBoard();

        updateUI(moveLogInfo);
        checkGameStatus();
        
        isAnimating = false;

        // Se è attiva l'IA, invoca il turno del computer
        triggerAIMove();
    }
}

function syncSpecialMoves(fromSq, toSq) {
    const piece = pieceMeshes[toSq];
    if (piece && piece.type === 'k') {
        const fromCol = fromSq.charCodeAt(0);
        const toCol = toSq.charCodeAt(0);
        if (Math.abs(fromCol - toCol) > 1) {
            let rookFrom, rookTo;
            const rank = piece.color === 'w' ? '1' : '8';
            if (toCol === 103) {
                rookFrom = 'h' + rank;
                rookTo = 'f' + rank;
            } else if (toCol === 99) {
                rookFrom = 'a' + rank;
                rookTo = 'd' + rank;
            }

            if (rookFrom && pieceMeshes[rookFrom]) {
                const rook = pieceMeshes[rookFrom];
                delete pieceMeshes[rookFrom];
                
                const rookCoords = algebraicToCoords(rookTo);
                gsap.to(rook.mesh.position, {
                    x: rookCoords.x,
                    z: rookCoords.z,
                    duration: 0.4,
                    ease: "power1.inOut",
                    onComplete: () => {
                        rook.mesh.userData.square = rookTo;
                        pieceMeshes[rookTo] = rook;
                    }
                });
            }
        }
    }

    const boardState = chess.board();
    for (let sq in pieceMeshes) {
        const col = sq.charCodeAt(0) - 97;
        const row = 8 - parseInt(sq.charAt(1));
        const boardPiece = boardState[row][col];
        
        if (!boardPiece) {
            scene.remove(pieceMeshes[sq].mesh);
            if (pieceMeshes[sq].mixer) {
                const idx = mixers.indexOf(pieceMeshes[sq].mixer);
                if (idx > -1) mixers.splice(idx, 1);
            }
            delete pieceMeshes[sq];
        } else if (boardPiece.type !== pieceMeshes[sq].type) {
            scene.remove(pieceMeshes[sq].mesh);
            if (pieceMeshes[sq].mixer) {
                const idx = mixers.indexOf(pieceMeshes[sq].mixer);
                if (idx > -1) mixers.splice(idx, 1);
            }
            delete pieceMeshes[sq];
            spawnPiece(boardPiece.type, boardPiece.color, sq);
        }
    }
}

// ==========================================================================
// 10. INTERAZIONI UTENTE (3D RAYCASTING & 2D CLIC)
// ==========================================================================

function onPointerDown(event) {
    pointerStart.set(event.clientX, event.clientY);
}

function onPointerUp(event) {
    const dist = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
    if (dist > 5) return; // Filtra drag rotazione camera

    if (isAnimating) return; 

    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const interactableObjects = [];
    for (let key in boardSquares3D) {
        interactableObjects.push(boardSquares3D[key]);
    }
    for (let key in pieceMeshes) {
        pieceMeshes[key].mesh.traverse(child => {
            if (child.isMesh) {
                child.userData.parentPiece = pieceMeshes[key];
                interactableObjects.push(child);
            }
        });
    }

    const intersects = raycaster.intersectObjects(interactableObjects, true);

    if (intersects.length > 0) {
        const hit = intersects[0].object;
        let clickedSquare = null;
        let clickedPiece = null;

        if (hit.userData.isTile) {
            clickedSquare = hit.userData.square;
        } else if (hit.userData.parentPiece) {
            clickedPiece = hit.userData.parentPiece;
            clickedSquare = clickedPiece.mesh.userData.square;
        }

        if (clickedSquare) {
            if (isSetupMode) {
                handleSetupClick(clickedSquare);
            } else if (!isTopDownView) {
                playSelectSound();
                handleSquareClick(clickedSquare, clickedPiece);
            }
        }
    } else {
        if (!isSetupMode) clearSelection();
    }
}

function handleSquareClick(square, piece) {
    const activePlayer = chess.turn();

    if (gameMode === 'pvai' && activePlayer === aiColor) return;
    if (gameMode === 'demo') return;

    if (selectedSquare && validMoves.includes(square)) {
        const possibleMoves = chess.moves({ square: selectedSquare, verbose: true });
        const moveDetails = possibleMoves.find(m => m.to === square);
        
        clearHighlights();
        executeMove3D(selectedSquare, square, moveDetails);
        selectedSquare = null;
        validMoves = [];
    } 
    else if (piece && piece.color === activePlayer) {
        clearSelection();
        selectedSquare = square;
        highlightSquare(square, COLOR_GOLD_HIGHLIGHT);
        
        const moves = chess.moves({ square: square, verbose: true });
        validMoves = moves.map(m => m.to);
        
        validMoves.forEach(targetSquare => {
            const isCapture = chess.get(targetSquare) !== null;
            highlightSquare(targetSquare, isCapture ? COLOR_RED_HIGHLIGHT : COLOR_BLUE_HIGHLIGHT);
        });
    } 
    else {
        clearSelection();
    }
}

function highlightSquare(square, colorHex) {
    const tile = boardSquares3D[square];
    if (tile) {
        tile.material.emissive.setHex(colorHex);
        tile.material.emissiveIntensity = 0.45;
    }
}

function clearHighlights() {
    for (let key in boardSquares3D) {
        boardSquares3D[key].material.emissive.setHex(0x000000);
        boardSquares3D[key].material.emissiveIntensity = 0.0;
    }
}

function clearSelection() {
    selectedSquare = null;
    validMoves = [];
    clearHighlights();
}

function handle2DClick(square) {
    if (isAnimating) return;

    if (isSetupMode) {
        handleSetupClick(square);
        return;
    }

    const activePlayer = chess.turn();
    const piece = chess.get(square);

    if (gameMode === 'pvai' && activePlayer === aiColor) return;
    if (gameMode === 'demo') return;

    if (selectedSquare2D && validMoves2D.includes(square)) {
        const possibleMoves = chess.moves({ square: selectedSquare2D, verbose: true });
        const moveDetails = possibleMoves.find(m => m.to === square);
        
        clear2DHighlights();
        executeMove3D(selectedSquare2D, square, moveDetails);
        
        selectedSquare2D = null;
        validMoves2D = [];
    }
    else if (piece && piece.color === activePlayer) {
        playSelectSound();
        clear2DHighlights();
        selectedSquare2D = square;
        
        const selectedTile = document.querySelector(`.tile-2d[data-square="${square}"]`);
        if (selectedTile) selectedTile.classList.add('highlight-gold');
        
        const moves = chess.moves({ square: square, verbose: true });
        validMoves2D = moves.map(m => m.to);
        
        validMoves2D.forEach(targetSq => {
            const targetTile = document.querySelector(`.tile-2d[data-square="${targetSq}"]`);
            if (targetTile) {
                const isCapture = chess.get(targetSq) !== null;
                targetTile.classList.add(isCapture ? 'highlight-red' : 'highlight-blue');
            }
        });
    }
    else {
        clear2DHighlights();
        selectedSquare2D = null;
        validMoves2D = [];
    }
}

function clear2DHighlights() {
    document.querySelectorAll('.tile-2d').forEach(tile => {
        tile.classList.remove('highlight-gold', 'highlight-blue', 'highlight-red');
    });
}

// ==========================================================================
// 11. EDITOR SCACCHIERA (SETUP MODE)
// ==========================================================================

function handleSetupClick(square) {
    playSelectSound();
    chess.remove(square);
    if (pieceMeshes[square]) {
        scene.remove(pieceMeshes[square].mesh);
        if (pieceMeshes[square].mixer) {
            const idx = mixers.indexOf(pieceMeshes[square].mixer);
            if (idx > -1) mixers.splice(idx, 1);
        }
        delete pieceMeshes[square];
    }

    if (!isDeleteMode && selectedSetupPiece) {
        chess.put(selectedSetupPiece, square);
        spawnPiece(selectedSetupPiece.type, selectedSetupPiece.color, square);
    }

    sync2DBoard();
}

function generateFENFromBoardState(turn) {
    const rows = [];
    const boardState = chess.board();

    for (let r = 0; r < 8; r++) {
        let emptyCount = 0;
        let rowStr = '';
        for (let c = 0; c < 8; c++) {
            const piece = boardState[r][c];
            if (!piece) {
                emptyCount++;
            } else {
                if (emptyCount > 0) {
                    rowStr += emptyCount;
                    emptyCount = 0;
                }
                const char = piece.type;
                rowStr += piece.color === 'w' ? char.toUpperCase() : char.toLowerCase();
            }
        }
        if (emptyCount > 0) {
            rowStr += emptyCount;
        }
        rows.push(rowStr);
    }

    const boardPart = rows.join('/');
    
    let whiteKing = false;
    let blackKing = false;
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const p = boardState[r][c];
            if (p && p.type === 'k') {
                if (p.color === 'w') whiteKing = true;
                if (p.color === 'b') blackKing = true;
            }
        }
    }

    if (!whiteKing || !blackKing) {
        return null;
    }

    return `${boardPart} ${turn} - - 0 1`;
}

// ==========================================================================
// 12. MOTORE DI CALCOLO SCACCHI AI (MINIMAX & APERTURE)
// ==========================================================================

const OPENING_BOOK = {
    "": ["e2e4", "d2d4", "g1f3"], 
    "e2e4": "e7e5",
    "d2d4": "d7d5",
    "g1f3": "d7d5",
    "e2e4 e7e5": "g1f3",
    "e2e4 e7e5 g1f3": "b8c6",
    "e2e4 e7e5 g1f3 b8c6": "f1b5", 
    "e2e4 e7e5 g1f3 b8c6 f1b5 a7a6": "b5a4",
    "e2e4 c7c5": "g1f3", 
    "e2e4 c7c5 g1f3": "d7d6",
    "e2e4 c7c5 g1f3 d7d6": "d2d4",
    "e2e4 e7e6": "d2d4", 
    "e2e4 e7e6 d2d4": "d7d5",
};

const PIECE_VALUES = {
    p: 100,
    n: 320,
    b: 330,
    r: 500,
    q: 900,
    k: 20000
};

const PAWN_PST = [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]
];

const KNIGHT_PST = [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]
];

const BISHOP_PST = [
    [-20,-10,-10,-10,-10,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5, 10, 10,  5,  0,-10],
    [-10,  5,  5, 10, 10,  5,  5,-10],
    [-10,  0, 10, 10, 10, 10,  0,-10],
    [-10, 10, 10, 10, 10, 10, 10,-10],
    [-10,  5,  0,  0,  0,  0,  5,-10],
    [-20,-10,-10,-10,-10,-10,-10,-20]
];

const ROOK_PST = [
    [0,  0,  0,  5,  5,  0,  0,  0],
    [5, 10, 10, 10, 10, 10, 10,  5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [-5,  0,  0,  0,  0,  0,  0, -5],
    [0,  0,  0,  5,  5,  0,  0,  0]
];

const QUEEN_PST = [
    [-20,-10,-10, -5, -5,-10,-10,-20],
    [-10,  0,  0,  0,  0,  0,  0,-10],
    [-10,  0,  5,  5,  5,  5,  0,-10],
    [-5,  0,  5,  5,  5,  5,  0, -5],
    [0,  0,  5,  5,  5,  5,  0, -5],
    [-10,  5,  5,  5,  5,  5,  0,-10],
    [-10,  0,  5,  0,  0,  5,  0,-10],
    [-20,-10,-10, -5, -5,-10,-10,-20]
];

const KING_PST = [
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-30,-40,-40,-50,-50,-40,-40,-30],
    [-20,-30,-30,-40,-40,-30,-30,-20],
    [-10,-20,-20,-20,-20,-20,-20,-10],
    [20, 20,  0,  0,  0,  0, 20, 20],
    [20, 30, 10,  0,  0, 10, 30, 20]
];

function evaluateBoard() {
    const boardState = chess.board();
    let totalEvaluation = 0;
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const piece = boardState[r][c];
            if (piece) {
                const type = piece.type;
                const color = piece.color;
                
                let value = PIECE_VALUES[type];
                let pstValue = 0;
                
                const tableRow = color === 'w' ? r : 7 - r;
                
                switch (type) {
                    case 'p': pstValue = PAWN_PST[tableRow][c]; break;
                    case 'n': pstValue = KNIGHT_PST[tableRow][c]; break;
                    case 'b': pstValue = BISHOP_PST[tableRow][c]; break;
                    case 'r': pstValue = ROOK_PST[tableRow][c]; break;
                    case 'q': pstValue = QUEEN_PST[tableRow][c]; break;
                    case 'k': pstValue = KING_PST[tableRow][c]; break;
                }
                
                const pieceEval = value + pstValue;
                totalEvaluation += color === 'w' ? pieceEval : -pieceEval;
            }
        }
    }
    return totalEvaluation;
}

function minimax(depth, isMaximizing, alpha, beta) {
    if (depth === 0 || chess.game_over()) {
        return evaluateBoard();
    }
    
    const moves = chess.moves();
    
    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let move of moves) {
            chess.move(move);
            let evaluation = minimax(depth - 1, false, alpha, beta);
            chess.undo();
            maxEval = Math.max(maxEval, evaluation);
            alpha = Math.max(alpha, evaluation);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let move of moves) {
            chess.move(move);
            let evaluation = minimax(depth - 1, true, alpha, beta);
            chess.undo();
            minEval = Math.min(minEval, evaluation);
            beta = Math.min(beta, evaluation);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

function triggerAIMove() {
    if (chess.game_over() || isAnimating || isSetupMode) return;
    
    const activePlayer = chess.turn(); // 'w' o 'b'
    const isAITurn = (gameMode === 'pvai' && activePlayer === aiColor) || (gameMode === 'demo');
    if (!isAITurn) return;

    // 1. Cerca mossa nel libro delle aperture
    const history = chess.history({ verbose: true });
    const moveStr = history.map(m => m.from + m.to).join(' ');

    if (OPENING_BOOK[moveStr]) {
        const bookMove = OPENING_BOOK[moveStr];
        let selectedMove = bookMove;
        if (Array.isArray(bookMove)) {
            selectedMove = bookMove[Math.floor(Math.random() * bookMove.length)];
        }

        const fromSq = selectedMove.substring(0, 2);
        const toSq = selectedMove.substring(2, 4);

        const moves = chess.moves({ square: fromSq, verbose: true });
        const moveDetails = moves.find(m => m.to === toSq);

        if (moveDetails) {
            const statusPanel = document.getElementById('status-panel');
            const statusText = document.getElementById('status-text');
            statusPanel.classList.remove('hidden');
            
            const txt = TRANSLATIONS[currentLang]['book'] || "AI (BOOK OPENING)...";
            statusText.innerText = txt;

            setTimeout(() => {
                statusPanel.classList.add('hidden');
                executeMove3D(fromSq, toSq, moveDetails);
            }, 500);
            return;
        }
    }

    // 2. Calcolo Minimax
    const statusPanel = document.getElementById('status-panel');
    const statusText = document.getElementById('status-text');
    statusPanel.classList.remove('hidden');
    
    const txtThinking = TRANSLATIONS[currentLang]['thinking'] || "AI THINKING...";
    statusText.innerText = txtThinking;

    setTimeout(() => {
        const moves = chess.moves({ verbose: true });
        if (moves.length === 0) return;

        let bestMove = null;
        let bestValue = activePlayer === 'w' ? -Infinity : Infinity;

        moves.sort(() => Math.random() - 0.5);
        const depth = aiDifficulty === 'easy' ? 1 : (aiDifficulty === 'medium' ? 2 : 3);

        for (let move of moves) {
            chess.move(move);
            let value = minimax(depth - 1, activePlayer === 'b', -Infinity, Infinity);
            chess.undo();

            if (activePlayer === 'w') {
                if (value > bestValue) {
                    bestValue = value;
                    bestMove = move;
                }
            } else {
                if (value < bestValue) {
                    bestValue = value;
                    bestMove = move;
                }
            }
        }

        statusPanel.classList.add('hidden');

        if (bestMove) {
            executeMove3D(bestMove.from, bestMove.to, bestMove);
        }
    }, 450);
}

// ==========================================================================
// 13. GESTIONE TELECAMERA ED EVENTI VISTA (3D VS 2D)
// ==========================================================================

function toggleCameraView() {
    isTopDownView = !isTopDownView;
    const btn = document.getElementById('btn-view');
    const board2DContainer = document.getElementById('board-2d-container');
    
    if (isTopDownView) {
        board2DContainer.classList.remove('hidden');
        sync2DBoard();
        clear2DHighlights();
        
        btn.querySelector('.btn-text').innerText = TRANSLATIONS[currentLang]['view3d'];
        btn.querySelector('.icon').innerText = "📐";
    } else {
        board2DContainer.classList.add('hidden');
        if (!isSetupMode) clearSelection();
        
        btn.querySelector('.btn-text').innerText = TRANSLATIONS[currentLang]['view2d'];
        btn.querySelector('.icon').innerText = "🎥";
    }
}

function resetCameraPosition(isTopDown) {
    if (isTopDown) {
        camera.position.set(0, 22, 0.01);
    } else {
        camera.position.set(0, 15, 16);
    }
    if (controls) {
        controls.target.set(0, 0, 0);
        controls.update();
    }
}

// ==========================================================================
// 14. GESTIONE UI E STATO DI GIOCO
// ==========================================================================

function setupUIEvents() {
    // 3D Canvas
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointerup', onPointerUp);

    // Buttons
    document.getElementById('btn-view').addEventListener('click', toggleCameraView);
    document.getElementById('btn-reset').addEventListener('click', restartGame);
    document.getElementById('btn-restart-game').addEventListener('click', () => {
        document.getElementById('game-over-overlay').classList.add('hidden');
        restartGame();
    });

    // Home Page Selects
    document.getElementById('home-select-lang').addEventListener('change', (e) => {
        setLanguage(e.target.value);
        document.getElementById('select-lang').value = e.target.value;
    });

    // Cambiamento Impostazioni Modalità / AI
    const handleModeChange = (val) => {
        gameMode = val;
        const diffGroup = document.getElementById('difficulty-group');
        const colorGroup = document.getElementById('ai-color-group');
        
        if (gameMode === 'pvp') {
            diffGroup.classList.add('hidden');
            colorGroup.classList.add('hidden');
        } else if (gameMode === 'pvai') {
            diffGroup.classList.remove('hidden');
            colorGroup.classList.remove('hidden');
        } else if (gameMode === 'demo') {
            diffGroup.classList.remove('hidden');
            colorGroup.classList.add('hidden');
        }
        
        // Sincronizza dropdown principale
        document.getElementById('select-mode').value = val;
    };

    document.getElementById('select-mode').addEventListener('change', (e) => {
        handleModeChange(e.target.value);
        triggerAIMove();
    });

    document.getElementById('select-difficulty').addEventListener('change', (e) => {
        aiDifficulty = e.target.value;
    });

    document.getElementById('select-ai-color').addEventListener('change', (e) => {
        aiColor = e.target.value;
        triggerAIMove();
    });

    // Sound and Music changes
    document.getElementById('select-music').addEventListener('change', (e) => {
        musicEnabled = e.target.value === 'on';
        if (musicEnabled) startMusicLoop();
        else stopMusicLoop();
    });

    document.getElementById('select-sound').addEventListener('change', (e) => {
        soundEnabled = e.target.value === 'on';
    });

    document.getElementById('select-lang').addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    // ==========================================
    // TASTO AVVIA GIOCO DA HOME PAGE
    // ==========================================
    document.getElementById('btn-start-game').addEventListener('click', () => {
        // Applica le scelte della Home Page
        const selectedLang = document.getElementById('home-select-lang').value;
        const selectedView = document.getElementById('home-select-view').value;
        const selectedMode = document.getElementById('home-select-mode').value;
        const selectedDifficulty = document.getElementById('home-select-difficulty').value;
        const selectedMusic = document.getElementById('home-select-music').value;
        const selectedSound = document.getElementById('home-select-sound').value;

        setLanguage(selectedLang);
        handleModeChange(selectedMode);
        
        aiDifficulty = selectedDifficulty;
        document.getElementById('select-difficulty').value = selectedDifficulty;

        musicEnabled = selectedMusic === 'on';
        document.getElementById('select-music').value = selectedMusic;

        soundEnabled = selectedSound === 'on';
        document.getElementById('select-sound').value = selectedSound;

        // Vista iniziale
        if (selectedView === '2d') {
            isTopDownView = false; // toggle lo invertirà
            toggleCameraView();
        }

        // Inizializza audio
        initAudio();
        if (musicEnabled) {
            startMusicLoop();
        }

        // Richiedi schermo intero su Mobile
        if (isMobile) {
            const docEl = document.documentElement;
            if (docEl.requestFullscreen) docEl.requestFullscreen();
            else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
            else if (docEl.msRequestFullscreen) docEl.msRequestFullscreen();
        }

        // Nascondi schermata home
        document.getElementById('home-screen').classList.add('hidden');
    });

    // ==========================================
    // CONTROLLI SETUP MODE (BOARD EDITOR)
    // ==========================================
    const btnSetup = document.getElementById('btn-setup');
    const panelSettings = document.getElementById('settings-panel');
    const panelSetup = document.getElementById('setup-panel');

    btnSetup.addEventListener('click', () => {
        if (isAnimating) return;
        
        isSetupMode = true;
        savedSetupFEN = chess.fen();
        savedSetupTurn = chess.turn();

        panelSettings.classList.add('hidden');
        panelSetup.classList.remove('hidden');
        btnSetup.classList.add('active');
        
        isDeleteMode = false;
        selectedSetupPiece = { type: 'p', color: 'w' };
        document.querySelectorAll('.palette-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.palette-btn[data-color="w"][data-type="p"]').classList.add('active');
        document.getElementById('btn-setup-delete').classList.remove('active');
        
        document.getElementById('select-setup-turn').value = savedSetupTurn;
        
        clearSelection();
        clear2DHighlights();
    });

    document.querySelectorAll('.palette-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            isDeleteMode = false;
            document.getElementById('btn-setup-delete').classList.remove('active');
            
            document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            selectedSetupPiece = {
                type: btn.dataset.type,
                color: btn.dataset.color
            };
        });
    });

    const btnDelete = document.getElementById('btn-setup-delete');
    btnDelete.addEventListener('click', () => {
        isDeleteMode = true;
        selectedSetupPiece = null;
        document.querySelectorAll('.palette-btn').forEach(b => b.classList.remove('active'));
        btnDelete.classList.add('active');
    });

    document.getElementById('btn-setup-clear').addEventListener('click', () => {
        chess.clear();
        for (let sq in pieceMeshes) {
            scene.remove(pieceMeshes[sq].mesh);
        }
        pieceMeshes = {};
        sync2DBoard();
    });

    document.getElementById('btn-setup-reset').addEventListener('click', () => {
        chess.reset();
        loadAllPieces().then(() => {
            sync2DBoard();
        });
    });

    document.getElementById('btn-setup-save').addEventListener('click', () => {
        const selectedTurn = document.getElementById('select-setup-turn').value;
        const targetFEN = generateFENFromBoardState(selectedTurn);

        if (!targetFEN) {
            const txtErr = TRANSLATIONS[currentLang]['invalid_setup'] || "Invalid position! Ensure both Kings are on the board.";
            alert(txtErr);
            return;
        }

        const success = chess.load(targetFEN);
        if (success) {
            isSetupMode = false;
            panelSetup.classList.add('hidden');
            panelSettings.classList.remove('hidden');
            btnSetup.classList.remove('active');
            
            document.getElementById('moves-list').innerHTML = '';
            moveCount = 1;
            
            updateUI();
            triggerAIMove();
        } else {
            alert("Error loading FEN.");
        }
    });

    document.getElementById('btn-setup-cancel').addEventListener('click', () => {
        isSetupMode = false;
        panelSetup.classList.add('hidden');
        panelSettings.classList.remove('hidden');
        btnSetup.classList.remove('active');

        chess.load(savedSetupFEN);
        loadAllPieces().then(() => {
            sync2DBoard();
            updateUI();
        });
    });
}

function updateUI(moveInfo) {
    const activePlayer = chess.turn() === 'w' ? 'white' : 'black';
    const playerTxt = TRANSLATIONS[currentLang][activePlayer];
    
    const turnIndicator = document.getElementById('turn-indicator');
    const currentPlayerLabel = document.getElementById('current-player');

    currentPlayerLabel.innerText = playerTxt;
    if (chess.turn() === 'w') {
        turnIndicator.className = "white-turn";
    } else {
        turnIndicator.className = "black-turn";
    }

    const statusPanel = document.getElementById('status-panel');
    if (chess.in_check() && !chess.in_checkmate()) {
        statusPanel.classList.remove('hidden');
        document.getElementById('status-text').innerText = TRANSLATIONS[currentLang]['check'];
    } else {
        statusPanel.classList.add('hidden');
    }

    if (moveInfo) {
        addMoveToLog(moveInfo);
    }
}

let moveCount = 1;
function addMoveToLog(move) {
    const list = document.getElementById('moves-list');
    
    // Traduzione simboli pezzi in base alla lingua
    let pKey = 'pawn';
    if (move.piece === 'r') pKey = 'rook';
    else if (move.piece === 'n') pKey = 'knight';
    else if (move.piece === 'b') pKey = 'bishop';
    else if (move.piece === 'q') pKey = 'queen';
    else if (move.piece === 'k') pKey = 'king';
    
    const pieceSym = TRANSLATIONS[currentLang][pKey].charAt(0).toUpperCase();
    const notation = `${pieceSym}${move.from}-${move.to}`;

    if (move.color === 'w') {
        const row = document.createElement('div');
        row.className = 'move-row';
        row.id = `move-row-${moveCount}`;
        
        row.innerHTML = `
            <span class="move-num">${moveCount}.</span>
            <span class="move-white">${notation}</span>
            <span class="move-black" id="black-move-${moveCount}">-</span>
        `;
        list.appendChild(row);
        list.scrollTop = list.scrollHeight;
    } else {
        const blackCell = document.getElementById(`black-move-${moveCount}`);
        if (blackCell) {
            blackCell.innerText = notation;
        }
        moveCount++;
    }
}

function checkGameStatus() {
    const gameOverOverlay = document.getElementById('game-over-overlay');
    const title = document.getElementById('game-over-title');
    const msg = document.getElementById('game-over-msg');

    if (chess.in_checkmate()) {
        playGameOverSound();
        gameOverOverlay.classList.remove('hidden');
        title.innerText = TRANSLATIONS[currentLang]['checkmate'];
        
        const winner = chess.turn() === 'w' ? 'black' : 'white';
        const winTxt = TRANSLATIONS[currentLang][`win_msg_${winner}`];
        msg.innerText = winTxt;
    } else if (chess.in_draw()) {
        playGameOverSound();
        gameOverOverlay.classList.remove('hidden');
        title.innerText = TRANSLATIONS[currentLang]['draw'];
        
        let reason = TRANSLATIONS[currentLang]['draw_general'];
        if (chess.in_stalemate()) reason = TRANSLATIONS[currentLang]['draw_stalemate'];
        else if (chess.insufficient_material()) reason = TRANSLATIONS[currentLang]['draw_insufficient'];
        else if (chess.in_threefold_repetition()) reason = TRANSLATIONS[currentLang]['draw_repetition'];
        msg.innerText = reason;
    } else if (chess.turn() === 'w' && chess.in_check() === false) {
        // Nessun suono fine partita
    }
}

function restartGame() {
    if (isAnimating) return;
    
    chess.reset();
    document.getElementById('moves-list').innerHTML = '';
    moveCount = 1;

    document.getElementById('status-panel').classList.add('hidden');
    updateUI();
    
    sync2DBoard();
    clear2DHighlights();
    selectedSquare2D = null;
    validMoves2D = [];

    document.getElementById('loading-overlay').classList.remove('hidden');
    document.getElementById('progress-bar').style.width = '0%';

    loadAllPieces().then(() => {
        document.getElementById('loading-overlay').classList.add('hidden');
        triggerAIMove();
    });
}

// ==========================================================================
// 15. UTILITY (CONVERSIONE COORDINATE)
// ==========================================================================

function coordsToAlgebraic(row, col) {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rank = 8 - row;
    return letters[col] + rank;
}

function algebraicToCoords(square) {
    const col = square.charCodeAt(0) - 97;
    const row = 8 - parseInt(square.charAt(1));
    
    const x = (col - BOARD_OFFSET) * TILE_SIZE;
    const z = (BOARD_OFFSET - row) * TILE_SIZE;
    
    return { x, z };
}

// ==========================================================================
// 16. LOOP DI ANIMAZIONE E RENDERIZZAZIONE
// ==========================================================================

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);

    const deltaTime = clock.getDelta();

    for (let i = 0; i < mixers.length; i++) {
        mixers[i].update(deltaTime);
    }

    if (controls && controls.enabled && !isTopDownView) {
        controls.update();
    }

    renderer.render(scene, camera);
}
