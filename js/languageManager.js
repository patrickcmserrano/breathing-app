const translations = {
    en: {
        // Navigation
        nav_home: "Home",
        nav_about: "About",
        nav_copyright: "Copyright",

        // Main page
        page_title: "4-7-8 Breathing Exercise",
        page_description: "The 4-7-8 breathing technique is a relaxation exercise. Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4 times.",
        press_start: "Press start to begin",
        start: "Start",
        stop: "Stop",
        inhale: "Inhale for 4 seconds",
        hold: "Hold for 7 seconds",
        exhale: "Exhale for 8 seconds",
        cycle_counter: "Cycle: {0}/4",

        // Sound controls
        background_sound: "Background Sound:",
        none: "None",
        meditation_music: "Meditation Spiritual Music",
        oriental_music: "Middle East Oriental Music",
        irish_harp: "Irish Harp",
        oud: "Voice of the Oud",
        tibetan_bowl: "Tibetan Singing Bowl",
        play: "Play",
        pause: "Pause",

        // Theme
        switch_theme: "Switch to {0} mode",
        dark: "dark",
        light: "light",

        // About page
        about_title: "About This Project",
        about_subtitle: "4-7-8 Breathing Exercise App",
        about_description: "This web application is designed to guide users through the 4-7-8 breathing technique, a simple yet powerful relaxation exercise that can help reduce anxiety and promote better sleep.",
        features: "Features",
        feature_1: "Visual and audio guidance for the 4-7-8 breathing technique",
        feature_2: "Customizable background sounds for enhanced relaxation",
        feature_3: "Dark/light theme support",
        feature_4: "Responsive design for all devices",
        developer: "Developer",
        created_by: "Created by Patrick CM Serrano",
        source_code: "Source Code",
        source_code_description: "This project is open source and available on GitHub. Feel free to contribute, report issues, or fork the repository:",
        view_on_github: "View on GitHub",

        // Copyright page
        copyright_title: "Copyright Information",
        copyright_notice: "This project uses audio files from Pixabay. All audio files are licensed under the Pixabay License.",
        copyright_description: "The Pixabay License grants you an irrevocable, worldwide, non-exclusive and royalty-free right to use, download, copy, modify or adapt the audio files for commercial and non-commercial purposes.",
        important_notes: "Important Notes",
        note_1: "Attribution is not required but appreciated.",
        note_2: "You can use the audio files in commercial and non-commercial projects.",
        note_3: "You cannot resell or redistribute the audio files.",
        note_4: "Some audio files may have additional restrictions specified on the download page (e.g., non-commercial use only).",
        audio_tracks: "Audio Tracks Used in This Project",
        audio_attribution: "All audio tracks are provided by",
        license_details: "For full license details, visit the",
        pixabay_tos: "Pixabay Terms of Service",

        // Language selector
        select_language: "Language:"
    },
    "pt-BR": {
        // Navigation
        nav_home: "Início",
        nav_about: "Sobre",
        nav_copyright: "Direitos Autorais",

        // Main page
        page_title: "Exercício de Respiração 4-7-8",
        page_description: "A técnica de respiração 4-7-8 é um exercício de relaxamento. Inspire por 4 segundos, segure por 7 segundos, expire por 8 segundos. Repita 4 vezes.",
        press_start: "Pressione iniciar para começar",
        start: "Iniciar",
        stop: "Parar",
        inhale: "Inspire por 4 segundos",
        hold: "Segure por 7 segundos",
        exhale: "Expire por 8 segundos",
        cycle_counter: "Ciclo: {0}/4",

        // Sound controls
        background_sound: "Som de Fundo:",
        none: "Nenhum",
        meditation_music: "Música Espiritual de Meditação",
        oriental_music: "Música Oriental do Oriente Médio",
        irish_harp: "Harpa Irlandesa",
        oud: "Voz do Oud",
        tibetan_bowl: "Sino Tibetano",
        play: "Tocar",
        pause: "Pausar",

        // Theme
        switch_theme: "Mudar para modo {0}",
        dark: "escuro",
        light: "claro",

        // About page
        about_title: "Sobre Este Projeto",
        about_subtitle: "Aplicativo de Exercício de Respiração 4-7-8",
        about_description: "Este aplicativo web foi projetado para guiar os usuários através da técnica de respiração 4-7-8, um exercício de relaxamento simples mas poderoso que pode ajudar a reduzir a ansiedade e promover um sono melhor.",
        features: "Recursos",
        feature_1: "Orientação visual e auditiva para a técnica de respiração 4-7-8",
        feature_2: "Sons de fundo personalizáveis para relaxamento aprimorado",
        feature_3: "Suporte a tema claro/escuro",
        feature_4: "Design responsivo para todos os dispositivos",
        developer: "Desenvolvedor",
        created_by: "Criado por Patrick CM Serrano",
        source_code: "Código Fonte",
        source_code_description: "Este projeto é de código aberto e está disponível no GitHub. Sinta-se à vontade para contribuir, reportar problemas ou fazer um fork do repositório:",
        view_on_github: "Ver no GitHub",

        // Copyright page
        copyright_title: "Informações de Direitos Autorais",
        copyright_notice: "Este projeto utiliza arquivos de áudio do Pixabay. Todos os arquivos de áudio são licenciados sob a Licença Pixabay.",
        copyright_description: "A Licença Pixabay concede a você um direito irrevogável, mundial, não exclusivo e livre de royalties para usar, baixar, copiar, modificar ou adaptar os arquivos de áudio para fins comerciais e não comerciais.",
        important_notes: "Notas Importantes",
        note_1: "Atribuição não é obrigatória, mas apreciada.",
        note_2: "Você pode usar os arquivos de áudio em projetos comerciais e não comerciais.",
        note_3: "Você não pode revender ou redistribuir os arquivos de áudio.",
        note_4: "Alguns arquivos de áudio podem ter restrições adicionais especificadas na página de download (por exemplo, apenas uso não comercial).",
        audio_tracks: "Faixas de Áudio Utilizadas Neste Projeto",
        audio_attribution: "Todas as faixas de áudio são fornecidas por",
        license_details: "Para detalhes completos da licença, visite os",
        pixabay_tos: "Termos de Serviço do Pixabay",

        // Language selector
        select_language: "Idioma:"
    }
};

export class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
    }

    initialize() {
        const buttons = document.querySelectorAll('.language-button');
        if (buttons) {
            buttons.forEach(button => {
                const lang = button.getAttribute('data-lang');
                if (lang === this.currentLanguage) {
                    button.classList.add('active');
                }
                button.addEventListener('click', (e) => {
                    const newLang = e.target.getAttribute('data-lang');
                    if (newLang !== this.currentLanguage) {
                        this.setLanguage(newLang);
                        window.location.reload();
                    }
                });
            });
        }
        this.updatePageContent();
    }

    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
    }

    getText(key, ...args) {
        const text = translations[this.currentLanguage]?.[key] || translations.en[key] || key;
        return text.replace(/\{(\d+)\}/g, (match, num) => args[num] != null ? args[num] : match);
    }

    updatePageContent() {
        // Update elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const args = element.getAttribute('data-i18n-args');
            if (args) {
                const argsArray = args.split(',').map(arg => this.getText(arg)); // Translate theme names
                element.textContent = this.getText(key, ...argsArray);
            } else {
                element.textContent = this.getText(key);
            }
        });

        // Update select options with data-i18n-option
        document.querySelectorAll('select').forEach(select => {
            select.querySelectorAll('option[data-i18n-option]').forEach(option => {
                const key = option.getAttribute('data-i18n-option');
                option.textContent = this.getText(key);
            });
        });
    }
}