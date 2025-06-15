import { Github, Users, BookOpen, Heart, ExternalLink } from "lucide-react";
import { SiLinkedin, SiHuggingface, SiGooglecolab } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background backdrop-blur-sm mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-6 md:py-8">
        {/* Main Footer Content */}
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
          {/* Project Info */}
          <div className="space-y-2 md:space-y-3 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 text-primary">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6" />
              <h3 className="font-tajawal-bold text-lg md:text-xl">معالج النصوص العربية</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-sm mx-auto md:mx-0">
              مشروع مقرر معالجة اللغات الطبيعية لتلخيص وتصنيف النصوص العربية باستخدام الذكاء
              الاصطناعي
            </p>
          </div>

          {/* Team Members */}
          <div className="space-y-2 md:space-y-3 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 text-primary">
              <Users className="w-5 h-5 md:w-6 md:h-6" />
              <h3 className="font-tajawal-bold text-lg md:text-xl">فريق العمل</h3>
            </div>
            <div className="space-y-1.5 md:space-y-1 flex flex-col items-center md:items-start">
              <a
                href="https://linkedin.com/in/fkhrayef"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-200 text-sm group py-1.5 px-3 rounded-md hover:bg-primary/5 min-h-[40px]"
              >
                <SiLinkedin className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>فيصل الخريف</span>
              </a>
              <a
                href="https://linkedin.com/in/mabosaimi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-200 text-sm group py-1.5 px-3 rounded-md hover:bg-primary/5 min-h-[40px]"
              >
                <SiLinkedin className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>محمد العصيمي</span>
              </a>
              <a
                href="https://linkedin.com/in/salman-2084b7288"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-200 text-sm group py-1.5 px-3 rounded-md hover:bg-primary/5 min-h-[40px]"
              >
                <SiLinkedin className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>سلمان الشومر</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-2 md:space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 text-primary">
              <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
              <h3 className="font-tajawal-bold text-lg md:text-xl">الروابط</h3>
            </div>
            <div className="space-y-1.5 md:space-y-1 flex flex-col items-center md:items-start">
              <a
                href="https://github.com/Fkhrayef/nlp-project"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-200 text-sm group py-1.5 px-3 rounded-md hover:bg-primary/5 min-h-[40px]"
              >
                <Github className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>GitHub</span>
              </a>
              <a
                href="https://huggingface.co/spaces/mabosaimi/arabic-summarizer-classifier/tree/main"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-200 text-sm group py-1.5 px-3 rounded-md hover:bg-primary/5 min-h-[40px]"
              >
                <SiHuggingface className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Hugging Face</span>
              </a>
              <a
                href="https://colab.research.google.com/drive/1NBHcvTOnndGl0JAG8rUKuTXU9VaMyegk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-200 text-sm group py-1.5 px-3 rounded-md hover:bg-primary/5 min-h-[40px]"
              >
                <SiGooglecolab className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Google Colab</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-6 md:mt-8 pt-4 md:pt-6">
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:justify-between text-center md:text-left">
            <p className="text-xs text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              صُنع بـ <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" /> لخدمة
              اللغة العربية
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} معالج النصوص العربية - جميع الحقوق محفوظة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
