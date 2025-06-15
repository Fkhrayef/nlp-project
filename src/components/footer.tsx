import { Github, Users, BookOpen, Heart, ExternalLink } from "lucide-react";
import { SiLinkedin } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Project Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <BookOpen className="w-6 h-6" />
              <h3 className="font-tajawal-bold text-xl">معالج النصوص العربية</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm max-w-sm">
              مشروع مقرر معالجة اللغات الطبيعية لتلخيص وتصنيف النصوص العربية باستخدام الذكاء
              الاصطناعي
            </p>
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <Users className="w-6 h-6" />
              <h3 className="font-tajawal-bold text-xl">فريق العمل</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center group">
                <SiLinkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <a
                  href="https://linkedin.com/in/faisal-alkhrayef"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tajawal-medium text-foreground hover:text-primary transition-colors duration-200 text-right"
                >
                  فيصل الخريف
                </a>
              </div>
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center group">
                <SiLinkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <a
                  href="https://linkedin.com/in/mohammed-alosaimi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tajawal-medium text-foreground hover:text-primary transition-colors duration-200 text-right"
                >
                  محمد العصيمي
                </a>
              </div>
              <div className="grid grid-cols-[20px_1fr] gap-3 items-center group">
                <SiLinkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                <a
                  href="https://linkedin.com/in/salman-alshawmar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-tajawal-medium text-foreground hover:text-primary transition-colors duration-200 text-right"
                >
                  سلمان الشومر
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary">
              <ExternalLink className="w-6 h-6" />
              <h3 className="font-tajawal-bold text-xl">الروابط</h3>
            </div>
            <div className="space-y-3">
              <a
                href="https://github.com/faisal-alkhrayef/nlp-project"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-200 text-sm group"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>مستودع الكود</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
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
