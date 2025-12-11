"use client";

import {
  Bell,
  BookOpen,
  Calendar,
  Clock,
  Download,
  HelpCircle,
  Plus,
  Share2,
  Smartphone,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CountdownEvent {
  id: string;
  title: string;
  date: Date;
  type: "birthday" | "exam" | "custom";
  color: string;
  notifications: boolean;
}

interface CountdownClientProps {
  language?: string;
}

export default function CountdownClient({ language = "en" }: CountdownClientProps) {
  // Define types for translations
  type TranslationSection = {
    title: string;
    steps?: string[];
    typesTitle?: string;
    actionsTitle?: string;
    typeDescriptions?: {
      birthday: string;
      exam: string;
      custom: string;
    };
    actionDescriptions?: {
      download: string;
      share: string;
      bell: string;
      delete: string;
    };
    calendarTitle?: string;
    sharingTitle?: string;
    calendarDescription?: string;
    sharingDescription?: string;
    calendarApps?: string[];
    sharingMethods?: string[];
    setupTitle?: string;
    settingsTitle?: string;
    setupSteps?: string[];
    settingsList?: string[];
    storageTitle?: string;
    privacyTitle?: string;
    storageList?: string[];
    privacyList?: string[];
    organizationTitle?: string;
    advancedTitle?: string;
    organizationList?: string[];
    advancedList?: string[];
    issues?: {
      title: string;
      description: string;
    }[];
  };

  type Translation = {
    title: string;
    description: string;
    tutorialToggle: {
      show: string;
      hide: string;
    };
    tutorialTitle: string;
    eventsTitle: string;
    addEvent: string;
    addEventButton: string;
    cancel: string;
    noEvents: {
      title: string;
      description: string;
      button: string;
    };
    form: {
      eventTitle: string;
      eventDate: string;
      placeholder: string;
    };
    types: {
      birthday: string;
      exam: string;
      custom: string;
    };
    actions: {
      download: string;
      share: string;
      reminder: string;
      delete: string;
    };
    timeUnits: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
    tutorial: {
      sections: TranslationSection[];
    };
  };

  // Translations for different languages
  const translations: Record<string, Translation> = {
    en: {
      title: "Personalized Countdown",
      description: "Create custom countdowns for birthdays, exams, or any special date",
      tutorialToggle: { show: "Show Tutorial", hide: "Hide Tutorial" },
      tutorialTitle: "How to Use Personalized Countdown",
      eventsTitle: "Your Events",
      addEvent: "Add Event",
      addEventButton: "Add Event",
      cancel: "Cancel",
      noEvents: {
        title: "No events yet",
        description: "Create your first personalized countdown to get started",
        button: "Add Your First Event",
      },
      form: {
        eventTitle: "Event Title",
        eventDate: "Event Date",
        placeholder: "Enter event title",
      },
      types: {
        birthday: "Birthday",
        exam: "Exam", 
        custom: "Custom",
      },
      actions: {
        download: "Export to Calendar",
        share: "Share Event",
        reminder: "Set Reminder",
        delete: "Delete Event",
      },
      timeUnits: {
        days: "Days",
        hours: "Hours", 
        minutes: "Minutes",
        seconds: "Seconds",
      },
      tutorial: {
        sections: [
          {
            title: "1. Creating Your First Event",
            steps: [
              "Click the \"Add Event\" button above",
              "Enter a descriptive title (e.g., \"My Birthday\", \"SAT Exam\")",
              "Select the exact date and time using the datetime picker",
              "Click \"Add Event\" to start your countdown",
            ],
          },
          {
            title: "2. Managing Your Events",
            typesTitle: "Event Types",
            actionsTitle: "Event Actions",
            typeDescriptions: {
              birthday: "Personal celebrations",
              exam: "Test dates and deadlines",
              custom: "Any special date",
            },
            actionDescriptions: {
              download: "Export to calendar",
              share: "Copy shareable link",
              bell: "Set notification reminder",
              delete: "Remove event",
            },
          },
          {
            title: "3. Export & Sharing Features",
            calendarTitle: "Calendar Export",
            sharingTitle: "Sharing Options",
            calendarDescription: "Export events as iCal files for:",
            sharingDescription: "Share your countdowns via:",
            calendarApps: ["Google Calendar", "Apple Calendar", "Outlook", "Other calendar apps"],
            sharingMethods: ["Direct link copy", "Social media", "Email or messaging", "Embedded widgets"],
          },
          {
            title: "4. Browser Notifications",
            setupTitle: "Setup Process",
            settingsTitle: "Notification Settings",
            setupSteps: [
              "Click the bell icon next to an event",
              "Allow notifications when prompted",
              "Receive reminder 24 hours before",
            ],
            settingsList: [
              "One-day advance reminder",
              "Browser-based (no app required)",
              "Works on desktop and mobile",
              "Customizable per event",
            ],
          },
          {
            title: "5. Data Storage & Privacy",
            storageTitle: "Local Storage",
            privacyTitle: "Privacy Features",
            storageList: [
              "Events stored in your browser",
              "No server storage required",
              "Works offline",
              "Automatic sync across tabs",
            ],
            privacyList: [
              "No personal data collection",
              "No tracking or analytics",
              "No account required",
              "Complete data control",
            ],
          },
          {
            title: "6. Pro Tips & Best Practices",
            organizationTitle: "Organization Tips",
            advancedTitle: "Advanced Usage",
            organizationList: [
              "Use descriptive event titles",
              "Color-code different event types",
              "Set reminders for important events",
              "Regular backup via calendar export",
            ],
            advancedList: [
              "Create recurring annual events",
              "Share family/group countdowns",
              "Export to multiple calendar formats",
              "Use focus mode for studying",
            ],
          },
          {
            title: "7. Troubleshooting Common Issues",
            issues: [
              {
                title: "Events not saving?",
                description: "Check if localStorage is enabled in your browser settings.",
              },
              {
                title: "Notifications not working?",
                description: "Ensure you've granted notification permissions and the event is at least 24 hours away.",
              },
              {
                title: "Calendar export failing?",
                description: "Try a different browser or check if download permissions are enabled.",
              },
            ],
          },
        ],
      },
    },
    zh: {
      title: "个性化倒计时",
      description: "为生日、考试或任何特殊日期创建自定义倒计时",
      tutorialToggle: { show: "显示教程", hide: "隐藏教程" },
      tutorialTitle: "如何使用个性化倒计时",
      eventsTitle: "你的事件",
      addEvent: "添加事件",
      addEventButton: "添加事件",
      cancel: "取消",
      noEvents: {
        title: "暂无事件",
        description: "创建你的第一个个性化倒计时开始使用",
        button: "添加你的第一个事件",
      },
      form: {
        eventTitle: "事件标题",
        eventDate: "事件日期",
        placeholder: "输入事件标题",
      },
      types: {
        birthday: "生日",
        exam: "考试",
        custom: "自定义",
      },
      actions: {
        download: "导出到日历",
        share: "分享事件",
        reminder: "设置提醒",
        delete: "删除事件",
      },
      timeUnits: {
        days: "天",
        hours: "小时",
        minutes: "分钟", 
        seconds: "秒",
      },
      tutorial: {
        sections: [
          {
            title: "1. 创建你的第一个事件",
            steps: [
              "点击上方的\"添加事件\"按钮",
              "输入描述性标题（例如：\"我的生日\"、\"SAT考试\"）",
              "使用日期时间选择器选择准确的日期和时间",
              "点击\"添加事件\"开始倒计时",
            ],
          },
          {
            title: "2. 管理你的事件",
            typesTitle: "事件类型",
            actionsTitle: "事件操作",
            typeDescriptions: {
              birthday: "个人庆祝",
              exam: "测试日期和截止日期",
              custom: "任何特殊日期",
            },
            actionDescriptions: {
              download: "导出到日历",
              share: "复制可分享链接",
              bell: "设置通知提醒",
              delete: "删除事件",
            },
          },
          {
            title: "3. 导出和分享功能",
            calendarTitle: "日历导出",
            sharingTitle: "分享选项",
            calendarDescription: "导出事件为iCal文件，适用于：",
            sharingDescription: "通过以下方式分享你的倒计时：",
            calendarApps: ["谷歌日历", "苹果日历", "Outlook", "其他日历应用"],
            sharingMethods: ["直接复制链接", "社交媒体", "电子邮件或消息", "嵌入小工具"],
          },
          {
            title: "4. 浏览器通知",
            setupTitle: "设置过程",
            settingsTitle: "通知设置",
            setupSteps: [
              "点击事件旁边的铃铛图标",
              "当提示时允许通知",
              "在事件前24小时接收提醒",
            ],
            settingsList: [
              "提前一天提醒",
              "基于浏览器（无需应用）",
              "适用于桌面和移动设备",
              "每个事件可自定义",
            ],
          },
          {
            title: "5. 数据存储和隐私",
            storageTitle: "本地存储",
            privacyTitle: "隐私功能",
            storageList: [
              "事件存储在浏览器中",
              "无需服务器存储",
              "离线工作",
              "自动同步到标签页",
            ],
            privacyList: [
              "不收集个人数据",
              "不跟踪或分析",
              "无需账户",
              "完全数据控制",
            ],
          },
          {
            title: "6. 专业技巧和最佳实践",
            organizationTitle: "组织技巧",
            advancedTitle: "高级用法",
            organizationList: [
              "使用描述性事件标题",
              "为不同事件类型使用颜色编码",
              "为重要事件设置提醒",
              "通过日历导出定期备份",
            ],
            advancedList: [
              "创建年度循环事件",
              "分享家庭/群体倒计时",
              "导出到多种日历格式",
              "使用专注模式学习",
            ],
          },
          {
            title: "7. 常见问题故障排除",
            issues: [
              {
                title: "事件不保存？",
                description: "检查浏览器设置中是否启用了localStorage。",
              },
              {
                title: "通知不工作？",
                description: "确保已授予通知权限，并且事件至少在24小时之后。",
              },
              {
                title: "日历导出失败？",
                description: "尝试使用不同浏览器或检查下载权限是否已启用。",
              },
            ],
          },
        ],
      },
    },
    fr: {
      title: "Compte à Rebours Personnalisé",
      description: "Créez des compteurs à rebours personnalisés pour les anniversaires, les examens ou toute date spéciale",
      tutorialToggle: { show: "Afficher le Tutoriel", hide: "Masquer le Tutoriel" },
      tutorialTitle: "Comment Utiliser le Compte à Rebours Personnalisé",
      eventsTitle: "Vos Événements",
      addEvent: "Ajouter un Événement",
      addEventButton: "Ajouter un Événement",
      cancel: "Annuler",
      noEvents: {
        title: "Aucun événement pour le moment",
        description: "Créez votre premier compte à rebours personnalisé pour commencer",
        button: "Ajouter Votre Premier Événement",
      },
      form: {
        eventTitle: "Titre de l'Événement",
        eventDate: "Date de l'Événement",
        placeholder: "Entrez le titre de l'événement",
      },
      types: {
        birthday: "Anniversaire",
        exam: "Examen",
        custom: "Personnalisé",
      },
      actions: {
        download: "Exporter vers le Calendrier",
        share: "Partager l'Événement",
        reminder: "Définir un Rappel",
        delete: "Supprimer l'Événement",
      },
      timeUnits: {
        days: "Jours",
        hours: "Heures",
        minutes: "Minutes",
        seconds: "Secondes",
      },
      tutorial: {
        sections: [
          {
            title: "1. Créer Votre Premier Événement",
            steps: [
              "Cliquez sur le bouton \"Ajouter un Événement\" ci-dessus",
              "Entrez un titre descriptif (par exemple, \"Mon Anniversaire\", \"Examen SAT\")",
              "Sélectionnez la date et l'heure exactes en utilisant le sélecteur de date/heure",
              "Cliquez sur \"Ajouter un Événement\" pour démarrer votre compte à rebours",
            ],
          },
          {
            title: "2. Gérer Vos Événements",
            typesTitle: "Types d'Événements",
            actionsTitle: "Actions d'Événement",
            typeDescriptions: {
              birthday: "Célébrations personnelles",
              exam: "Dates d'examen et délais",
              custom: "Toute date spéciale",
            },
            actionDescriptions: {
              download: "Exporter vers le calendrier",
              share: "Copier le lien partageable",
              bell: "Définir un rappel de notification",
              delete: "Supprimer l'événement",
            },
          },
          {
            title: "3. Fonctionnalités d'Export et de Partage",
            calendarTitle: "Export de Calendrier",
            sharingTitle: "Options de Partage",
            calendarDescription: "Exportez les événements en tant que fichiers iCal pour :",
            sharingDescription: "Partagez vos comptes à rebours via :",
            calendarApps: ["Google Calendar", "Apple Calendar", "Outlook", "Autres applications de calendrier"],
            sharingMethods: ["Copie de lien direct", "Médias sociaux", "E-mail ou messagerie", "Widgets intégrés"],
          },
          {
            title: "4. Notifications du Navigateur",
            setupTitle: "Processus de Configuration",
            settingsTitle: "Paramètres de Notification",
            setupSteps: [
              "Cliquez sur l'icône de cloche à côté d'un événement",
              "Autorisez les notifications lorsque vous y êtes invité",
              "Recevez un rappel 24 heures avant",
            ],
            settingsList: [
              "Rappel d'une journée à l'avance",
              "Basé sur le navigateur (aucune application requise)",
              "Fonctionne sur bureau et mobile",
              "Personnalisable par événement",
            ],
          },
          {
            title: "5. Stockage des Données et Confidentialité",
            storageTitle: "Stockage Local",
            privacyTitle: "Fonctionnalités de Confidentialité",
            storageList: [
              "Événements stockés dans votre navigateur",
              "Aucun stockage serveur requis",
              "Fonctionne hors ligne",
              "Synchronisation automatique entre les onglets",
            ],
            privacyList: [
              "Aucune collecte de données personnelles",
              "Aucun suivi ou analyse",
              "Aucun compte requis",
              "Contrôle complet des données",
            ],
          },
          {
            title: "6. Conseils Professionnels et Meilleures Pratiques",
            organizationTitle: "Conseils d'Organisation",
            advancedTitle: "Utilisation Avancée",
            organizationList: [
              "Utilisez des titres d'événements descriptifs",
              "Codez les différents types d'événements par couleur",
              "Définissez des rappels pour les événements importants",
              "Sauvegarde régulière via l'export de calendrier",
            ],
            advancedList: [
              "Créer des événements annuels récurrents",
              "Partager des comptes à rebours familiaux/groupe",
              "Exporter vers plusieurs formats de calendrier",
              "Utiliser le mode focus pour étudier",
            ],
          },
          {
            title: "7. Dépannage des Problèmes Courants",
            issues: [
              {
                title: "Les événements ne se sauvegardent pas ?",
                description: "Vérifiez si localStorage est activé dans les paramètres de votre navigateur.",
              },
              {
                title: "Les notifications ne fonctionnent pas ?",
                description: "Assurez-vous d'avoir accordé les autorisations de notification et que l'événement est au moins 24 heures plus tard.",
              },
              {
                title: "L'export de calendrier échoue ?",
                description: "Essayez un navigateur différent ou vérifiez si les autorisations de téléchargement sont activées.",
              },
            ],
          },
        ],
      },
    },
    es: {
      title: "Cuenta Regresiva Personalizada",
      description: "Crea cuentas regresivas personalizadas para cumpleaños, exámenes o cualquier fecha especial",
      tutorialToggle: { show: "Mostrar Tutorial", hide: "Ocultar Tutorial" },
      tutorialTitle: "Cómo Usar la Cuenta Regresiva Personalizada",
      eventsTitle: "Tus Eventos",
      addEvent: "Agregar Evento",
      addEventButton: "Agregar Evento",
      cancel: "Cancelar",
      noEvents: {
        title: "Aún no hay eventos",
        description: "Crea tu primera cuenta regresiva personalizada para comenzar",
        button: "Agregar Tu Primer Evento",
      },
      form: {
        eventTitle: "Título del Evento",
        eventDate: "Fecha del Evento",
        placeholder: "Ingresa el título del evento",
      },
      types: {
        birthday: "Cumpleaños",
        exam: "Examen",
        custom: "Personalizado",
      },
      actions: {
        download: "Exportar al Calendario",
        share: "Compartir Evento",
        reminder: "Establecer Recordatorio",
        delete: "Eliminar Evento",
      },
      timeUnits: {
        days: "Días",
        hours: "Horas",
        minutes: "Minutos",
        seconds: "Segundos",
      },
      tutorial: {
        sections: [
          {
            title: "1. Crear Tu Primer Evento",
            steps: [
              "Haz clic en el botón \"Agregar Evento\" de arriba",
              "Ingresa un título descriptivo (ej., \"Mi Cumpleaños\", \"Examen SAT\")",
              "Selecciona la fecha y hora exactas usando el selector de fecha y hora",
              "Haz clic en \"Agregar Evento\" para iniciar tu cuenta regresiva",
            ],
          },
          {
            title: "2. Gestionar Tus Eventos",
            typesTitle: "Tipos de Eventos",
            actionsTitle: "Acciones de Evento",
            typeDescriptions: {
              birthday: "Celebraciones personales",
              exam: "Fechas de examen y plazos",
              custom: "Cualquier fecha especial",
            },
            actionDescriptions: {
              download: "Exportar al calendario",
              share: "Copiar enlace compartible",
              bell: "Establecer recordatorio de notificación",
              delete: "Eliminar evento",
            },
          },
          {
            title: "3. Funciones de Exportación y Compartición",
            calendarTitle: "Exportación de Calendario",
            sharingTitle: "Opciones de Compartición",
            calendarDescription: "Exporta eventos como archivos iCal para:",
            sharingDescription: "Comparte tus cuentas regresivas mediante:",
            calendarApps: ["Google Calendar", "Apple Calendar", "Outlook", "Otras aplicaciones de calendario"],
            sharingMethods: ["Copia de enlace directo", "Redes sociales", "Correo electrónico o mensajería", "Widgets integrados"],
          },
          {
            title: "4. Notificaciones del Navegador",
            setupTitle: "Proceso de Configuración",
            settingsTitle: "Configuración de Notificaciones",
            setupSteps: [
              "Haz clic en el ícono de campana junto a un evento",
              "Permite las notificaciones cuando se solicite",
              "Recibe recordatorio 24 horas antes",
            ],
            settingsList: [
              "Recordatorio de un día de anticipación",
              "Basado en navegador (no se requiere aplicación)",
              "Funciona en escritorio y móvil",
              "Personalizable por evento",
            ],
          },
          {
            title: "5. Almacenamiento de Datos y Privacidad",
            storageTitle: "Almacenamiento Local",
            privacyTitle: "Características de Privacidad",
            storageList: [
              "Eventos almacenados en tu navegador",
              "No se requiere almacenamiento en servidor",
              "Funciona sin conexión",
              "Sincronización automática entre pestañas",
            ],
            privacyList: [
              "No se recopilan datos personales",
              "No seguimiento ni análisis",
              "No se requiere cuenta",
              "Control completo de datos",
            ],
          },
          {
            title: "6. Consejos Profesionales y Mejores Prácticas",
            organizationTitle: "Consejos de Organización",
            advancedTitle: "Uso Avanzado",
            organizationList: [
              "Usa títulos de eventos descriptivos",
              "Codifica con colores diferentes tipos de eventos",
              "Establece recordatorios para eventos importantes",
              "Respaldo regular mediante exportación de calendario",
            ],
            advancedList: [
              "Crear eventos anuales recurrentes",
              "Compartir cuentas regresivas familiares/grupales",
              "Exportar a múltiples formatos de calendario",
              "Usar modo de enfoque para estudiar",
            ],
          },
          {
            title: "7. Solución de Problemas Comunes",
            issues: [
              {
                title: "¿Los eventos no se guardan?",
                description: "Verifica si localStorage está habilitado en la configuración de tu navegador.",
              },
              {
                title: "¿Las notificaciones no funcionan?",
                description: "Asegúrate de haber otorgado permisos de notificación y que el evento sea al menos 24 horas después.",
              },
              {
                title: "¿La exportación de calendario falla?",
                description: "Prueba un navegador diferente o verifica si los permisos de descarga están habilitados.",
              },
            ],
          },
        ],
      },
    },
  };

  const t: Translation = translations[language] || translations.en;

  const [events, setEvents] = useState<CountdownEvent[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    type: "custom" as "birthday" | "exam" | "custom",
  });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load saved events
  useEffect(() => {
    const savedEvents = localStorage.getItem("countdown-events");
    if (savedEvents) {
      const parsed = JSON.parse(savedEvents).map(
        (event: Record<string, unknown>) => ({
          ...event,
          date: new Date(event.date as string),
        }),
      );
      setEvents(parsed as CountdownEvent[]);
    }
  }, []);

  // Save events to localStorage
  const saveEvents = (updatedEvents: CountdownEvent[]) => {
    localStorage.setItem("countdown-events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  // Calculate time difference
  const getTimeDifference = (targetDate: Date) => {
    const now = Date.now();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  };

  // Real-time countdown updates
  useEffect(() => {
    const updateCountdowns = () => {
      setEvents((prev) => [...prev]);
    };

    intervalRef.current = setInterval(updateCountdowns, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Add new event
  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const event: CountdownEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: new Date(newEvent.date),
      type: newEvent.type,
      color: getRandomColor(),
      notifications: true,
    };

    const updatedEvents = [...events, event];
    saveEvents(updatedEvents);
    setNewEvent({ title: "", date: "", type: "custom" });
    setIsAddingEvent(false);
  };

  // Delete event
  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    saveEvents(updatedEvents);
  };

  // Generate random color
  const getRandomColor = () => {
    const colors = [
      "#3b82f6",
      "#ef4444",
      "#10b981",
      "#f59e0b",
      "#8b5cf6",
      "#ec4899",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Export to iCal
  const exportToICal = (event: CountdownEvent) => {
    const startDate = `${event.date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
    const endDate = `${new Date(event.date.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;

    const icalContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Exam TimeKeeper//Personalized Countdown//EN",
      "BEGIN:VEVENT",
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:Personalized countdown event created with Exam TimeKeeper`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icalContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, "-").toLowerCase()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Set notification reminder
  const setNotificationReminder = (event: CountdownEvent) => {
    const timeDiff = event.date.getTime() - Date.now();
    const oneDayBefore = timeDiff - 24 * 60 * 60 * 1000;

    if (
      oneDayBefore > 0 &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      setTimeout(() => {
        new Notification(`Reminder: ${event.title} is tomorrow!`, {
          body: `Your countdown event "${event.title}" is approaching.`,
          icon: "/icon-192x192.png",
        });
      }, oneDayBefore);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
          <p className="text-muted-foreground mb-4">{t.description}</p>
          <Button
            variant="outline"
            onClick={() => setShowTutorial(!showTutorial)}
            className="mb-4"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            {showTutorial ? t.tutorialToggle.hide : t.tutorialToggle.show}
          </Button>
        </div>

        {/* Tutorial Section */}
        {showTutorial && (
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              {t.tutorialTitle}
            </h2>

            <div className="grid gap-6">
              {t.tutorial.sections.map((section, index) => (
                <section key={index}>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    {index === 0 && <Plus className="w-5 h-5" />}
                    {index === 1 && <Calendar className="w-5 h-5" />}
                    {index === 2 && <Download className="w-5 h-5" />}
                    {index === 3 && <Bell className="w-5 h-5" />}
                    {index === 4 && <Smartphone className="w-5 h-5" />}
                    {index === 5 && <Clock className="w-5 h-5" />}
                    {index === 6 && <HelpCircle className="w-5 h-5" />}
                    {section.title}
                  </h3>
                  
                  {section.steps && (
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      {section.steps.map((step, stepIndex) => (
                        <p key={stepIndex}>
                          <strong>Step {stepIndex + 1}:</strong> {step}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  {section.typesTitle && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{section.typesTitle}</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>{t.types.birthday}:</strong> {section.typeDescriptions?.birthday}</li>
                          <li>• <strong>{t.types.exam}:</strong> {section.typeDescriptions?.exam}</li>
                          <li>• <strong>{t.types.custom}:</strong> {section.typeDescriptions?.custom}</li>
                        </ul>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{section.actionsTitle}</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• <strong>{t.actions.download}:</strong> {section.actionDescriptions?.download}</li>
                          <li>• <strong>{t.actions.share}:</strong> {section.actionDescriptions?.share}</li>
                          <li>• <strong>{t.actions.reminder}:</strong> {section.actionDescriptions?.bell}</li>
                          <li>• <strong>{t.actions.delete}:</strong> {section.actionDescriptions?.delete}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {section.calendarTitle && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {section.calendarTitle}
                        </h4>
                        <p className="text-sm mb-2">{section.calendarDescription}</p>
                        <ul className="text-sm space-y-1">
                          {section.calendarApps?.map((app, appIndex) => (
                            <li key={appIndex}>• {app}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          {section.sharingTitle}
                        </h4>
                        <p className="text-sm mb-2">{section.sharingDescription}</p>
                        <ul className="text-sm space-y-1">
                          {section.sharingMethods?.map((method, methodIndex) => (
                            <li key={methodIndex}>• {method}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {section.setupTitle && (
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Smartphone className="w-4 h-4" />
                            {section.setupTitle}
                          </h4>
                          <ol className="text-sm space-y-1">
                            {section.setupSteps?.map((step, stepIndex) => (
                              <li key={stepIndex}>{stepIndex + 1}. {step}</li>
                            ))}
                          </ol>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">{section.settingsTitle}</h4>
                          <ul className="text-sm space-y-1">
                            {section.settingsList?.map((setting, settingIndex) => (
                              <li key={settingIndex}>• {setting}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {section.storageTitle && (
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">{section.storageTitle}</h4>
                          <ul className="text-sm space-y-1">
                            {section.storageList?.map((item, itemIndex) => (
                              <li key={itemIndex}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">{section.privacyTitle}</h4>
                          <ul className="text-sm space-y-1">
                            {section.privacyList?.map((item, itemIndex) => (
                              <li key={itemIndex}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {section.organizationTitle && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{section.organizationTitle}</h4>
                        <ul className="text-sm space-y-1">
                          {section.organizationList?.map((tip, tipIndex) => (
                            <li key={tipIndex}>• {tip}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">{section.advancedTitle}</h4>
                        <ul className="text-sm space-y-1">
                          {section.advancedList?.map((usage, usageIndex) => (
                            <li key={usageIndex}>• {usage}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {section.issues && (
                    <div className="space-y-3">
                      {section.issues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="bg-muted p-3 rounded-lg">
                          <p className="font-medium">{issue.title}</p>
                          <p className="text-sm">{issue.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </Card>
        )}

        <div className="grid gap-6">
          {/* Add New Event */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">{t.eventsTitle}</h2>
              <Button onClick={() => setIsAddingEvent(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {t.addEvent}
              </Button>
            </div>

            {isAddingEvent && (
              <div className="space-y-4 p-4 border rounded-lg">
                <div>
                  <Label htmlFor="title">{t.form.eventTitle}</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder={t.form.placeholder}
                  />
                </div>
                <div>
                  <Label htmlFor="date">{t.form.eventDate}</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addEvent}>{t.addEventButton}</Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingEvent(false)}
                  >
                    {t.cancel}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Events List */}
          <div className="grid gap-4">
            {events.map((event) => {
              const timeDiff = getTimeDifference(event.date);
              return (
                <Card key={event.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">
                          {event.title}
                        </h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-muted">
                          {t.types[event.type]}
                        </span>
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: event.color }}
                        />
                      </div>
                      <div className="text-muted-foreground mb-4">
                        {event.date.toLocaleDateString()} at{" "}
                        {event.date.toLocaleTimeString()}
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold">
                            {timeDiff.days}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {t.timeUnits.days}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {timeDiff.hours}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {t.timeUnits.hours}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {timeDiff.minutes}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {t.timeUnits.minutes}
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold">
                            {timeDiff.seconds}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {t.timeUnits.seconds}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => exportToICal(event)}
                        title={t.actions.download}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.href}#event-${event.id}`,
                          );
                        }}
                        title={t.actions.share}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setNotificationReminder(event)}
                        title={t.actions.reminder}
                      >
                        <Bell className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteEvent(event.id)}
                        title={t.actions.delete}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {events.length === 0 && (
            <Card className="p-12 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">{t.noEvents.title}</h3>
              <p className="text-muted-foreground mb-4">
                {t.noEvents.description}
              </p>
              <Button onClick={() => setIsAddingEvent(true)}>
                <Plus className="w-4 h-4 mr-2" />
                {t.noEvents.button}
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}