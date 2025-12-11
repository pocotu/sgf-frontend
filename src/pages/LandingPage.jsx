import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  useEffect(() => {
    // Cargar Bootstrap Icons
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="bg-white text-secondary-900 overflow-x-hidden font-sans">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-secondary-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-primary-700 to-primary-900 text-white rounded-xl shadow-lg">
                <i className="bi bi-mortarboard-fill text-2xl"></i>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl leading-tight tracking-tight text-primary-700">
                  Lumen
                </span>
                <span className="text-xs font-medium tracking-wider uppercase text-secondary-600">
                  Sistema de Gestión Académica
                </span>
              </div>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                className="text-sm font-medium hover:text-brand-maroon transition-colors"
                href="#inicio"
              >
                Inicio
              </a>
              <a
                className="text-sm font-medium hover:text-brand-maroon transition-colors"
                href="#caracteristicas"
              >
                Características
              </a>
              <a
                className="text-sm font-medium hover:text-brand-maroon transition-colors"
                href="#modalidades"
              >
                Modalidades
              </a>
              <a
                className="text-sm font-medium hover:text-brand-maroon transition-colors"
                href="#areas"
              >
                Áreas
              </a>
            </div>
            {/* CTA Button */}
            <div className="flex items-center gap-4">
              <Link
                to="/auth/login"
                className="hidden sm:flex items-center justify-center px-6 h-11 rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all"
              >
                <i className="bi bi-box-arrow-in-right mr-2 text-lg"></i>
                Ingresar al Sistema
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative pt-20 min-h-screen flex items-center bg-gradient-to-br from-white via-brand-cream/30 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 w-fit">
                <i className="bi bi-patch-check-fill text-primary-600 text-base"></i>
                <span className="text-xs font-bold tracking-wider uppercase text-primary-700">
                  Sistema Especializado UNSAAC
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-secondary-900 leading-[0.95] tracking-tight">
                Gestión Académica <span className="text-primary-700">Inteligente</span> para
                Academias
              </h1>
              <p className="text-lg sm:text-xl text-secondary-600 max-w-lg leading-relaxed">
                Sistema completo para gestionar matrículas, asistencia, evaluaciones y rankings en
                academias preuniversitarias. Diseñado específicamente para el formato UNSAAC.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/auth/login"
                  className="flex items-center justify-center h-14 px-8 rounded-xl bg-gradient-to-r from-primary-600 to-primary-800 text-white text-base font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <i className="bi bi-rocket-takeoff-fill mr-2 text-xl"></i>
                  Comenzar Ahora
                </Link>
                <a
                  href="#caracteristicas"
                  className="flex items-center justify-center h-14 px-8 rounded-xl bg-white border-2 border-secondary-200 text-secondary-900 text-base font-semibold hover:bg-secondary-50 hover:border-primary-300 transition-all"
                >
                  Ver Características
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border border-secondary-100">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-5 bg-primary-50 rounded-2xl border border-primary-100 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-lg">
                      <i className="bi bi-people-fill text-white text-2xl"></i>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-secondary-600">Estudiantes Activos</p>
                      <p className="text-3xl font-black text-primary-700">300+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-amber-50 rounded-2xl border border-amber-100 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg">
                      <i className="bi bi-clipboard-data-fill text-white text-2xl"></i>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-secondary-600">Simulacros Semanales</p>
                      <p className="text-3xl font-black text-amber-700">100%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100 hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-lg">
                      <i className="bi bi-graph-up-arrow text-white text-2xl"></i>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-secondary-600">Automatización</p>
                      <p className="text-3xl font-black text-emerald-700">Rankings</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-brand-maroon/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-brand-gold/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="caracteristicas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">
              Funcionalidades
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-secondary-900 mt-3">
              Todo lo que Necesitas
            </h2>
            <p className="text-secondary-600 text-lg mt-4 max-w-2xl mx-auto">
              Sistema completo diseñado específicamente para academias preuniversitarias que
              preparan para la UNSAAC
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'bi-person-plus-fill',
                title: 'Gestión de Matrículas',
                description:
                  'Registro completo de estudiantes por modalidad (ORDINARIO, PRIMERA_OPCION, DIRIMENCIA) y área académica (A, B, C, D). Validación automática de cupos y generación de códigos internos.',
                bgColor: 'bg-primary-50',
                iconBg: 'bg-gradient-to-br from-primary-600 to-primary-800',
                iconColor: 'text-white',
                borderHover: 'hover:border-primary-300',
              },
              {
                icon: 'bi-clipboard-check-fill',
                title: 'Control de Asistencia',
                description:
                  'Registro digital de asistencia diaria con estados (PRESENTE, TARDANZA, AUSENTE). Reportes automáticos de porcentaje de asistencia por estudiante y grupo.',
                bgColor: 'bg-blue-50',
                iconBg: 'bg-gradient-to-br from-blue-600 to-blue-800',
                iconColor: 'text-white',
                borderHover: 'hover:border-blue-300',
              },
              {
                icon: 'bi-file-earmark-text-fill',
                title: 'Simulacros Semanales',
                description:
                  'Programación de evaluaciones tipo UNSAAC (80 preguntas). Registro de notas por curso en escala vigesimal (0-20). Cálculo automático de promedios.',
                bgColor: 'bg-purple-50',
                iconBg: 'bg-gradient-to-br from-purple-600 to-purple-800',
                iconColor: 'text-white',
                borderHover: 'hover:border-purple-300',
              },
              {
                icon: 'bi-trophy-fill',
                title: 'Rankings Automáticos',
                description:
                  'Generación automática de rankings por grupo después de cada simulacro. Visualización de posición y promedio para motivar a los estudiantes.',
                bgColor: 'bg-amber-50',
                iconBg: 'bg-gradient-to-br from-amber-600 to-amber-800',
                iconColor: 'text-white',
                borderHover: 'hover:border-amber-300',
              },
              {
                icon: 'bi-bar-chart-fill',
                title: 'Reportes Académicos',
                description:
                  'Análisis de rendimiento por curso y área. Identificación de cursos con bajo promedio. Reportes de asistencia y rendimiento individual.',
                bgColor: 'bg-emerald-50',
                iconBg: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
                iconColor: 'text-white',
                borderHover: 'hover:border-emerald-300',
              },
              {
                icon: 'bi-shield-fill-check',
                title: 'Seguridad y Roles',
                description:
                  'Sistema de autenticación con 3 roles (Administrador, Docente, Estudiante). Protección de datos según Ley N° 29733. Acceso controlado por permisos.',
                bgColor: 'bg-slate-50',
                iconBg: 'bg-gradient-to-br from-slate-600 to-slate-800',
                iconColor: 'text-white',
                borderHover: 'hover:border-slate-300',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl p-8 border-2 border-secondary-100 ${feature.borderHover} transition-all hover:shadow-xl`}
              >
                <div
                  className={`w-16 h-16 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <i className={`${feature.icon} ${feature.iconColor} text-3xl`}></i>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-3">{feature.title}</h3>
                <p className="text-secondary-600 leading-relaxed text-[15px]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modalidades Section */}
      <section
        id="modalidades"
        className="py-20 bg-gradient-to-br from-brand-cream/30 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-maroon font-bold tracking-wider uppercase text-sm">
              Modalidades
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-secondary-900 mt-2">
              Tres Modalidades de Preparación
            </h2>
            <p className="text-secondary-600 mt-4 max-w-2xl mx-auto">
              Sistema adaptado a las tres modalidades oficiales de preparación para la UNSAAC
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'ORDINARIO',
                icon: 'bi-mortarboard-fill',
                description:
                  'Programa completo y más exigente para egresados de secundaria. Preparación integral con todos los cursos del prospecto UNSAAC.',
                features: ['Temario completo por área', 'Simulacros semanales', 'Horario flexible'],
                color: 'brand-maroon',
                badge: null,
              },
              {
                title: 'PRIMERA OPCIÓN',
                icon: 'bi-award-fill',
                description:
                  'Exclusivo para alumnos de 4º y 5º de secundaria. Preparación anticipada con horarios compatibles con el colegio.',
                features: ['Turno mañana o tarde', 'Compatible con colegio', 'Ingreso anticipado'],
                color: 'brand-gold',
                badge: 'Recomendado',
              },
              {
                title: 'DIRIMENCIA',
                icon: 'bi-scales',
                description:
                  'Para primeros puestos de colegio. Preparación intensiva especializada para competir con los mejores promedios.',
                features: ['Solo 1º y 2º puesto', 'Preparación intensiva', 'Una oportunidad'],
                color: 'secondary',
                badge: null,
              },
            ].map((modalidad, index) => (
              <div
                key={index}
                className={`group bg-white rounded-3xl p-8 border-2 border-${modalidad.color}/20 hover:border-${modalidad.color} transition-all hover:shadow-2xl relative overflow-hidden`}
              >
                {modalidad.badge && (
                  <div className="absolute top-0 right-0 bg-brand-gold text-white text-[10px] font-black px-3 py-1.5 rounded-bl-xl uppercase">
                    {modalidad.badge}
                  </div>
                )}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${modalidad.color}/5 rounded-full -mr-16 -mt-16`}></div>
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-${modalidad.color === 'brand-gold' ? 'brand-gold-dark' : modalidad.color === 'brand-maroon' ? 'brand-maroon' : 'secondary-700'} text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <i className={`${modalidad.icon} text-3xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 mb-3">{modalidad.title}</h3>
                  <p className="text-secondary-600 mb-6 leading-relaxed">{modalidad.description}</p>
                  <div className="space-y-3">
                    {modalidad.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-secondary-700">
                        <i
                          className={`bi bi-check-circle-fill text-${modalidad.color === 'brand-gold' ? 'brand-gold-dark' : modalidad.color === 'brand-maroon' ? 'brand-maroon' : 'secondary-700'} text-lg`}
                        ></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section id="areas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-secondary-900 mb-12 text-center">
            Cuatro Áreas Académicas UNSAAC
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                area: 'A',
                title: 'Ciencias e\nIngeniería',
                carreras: 'Informática, Civil, Química, Física, Minas',
                color: 'blue',
                icon: 'bi-gear-fill',
              },
              {
                area: 'B',
                title: 'Ciencias de\nla Salud',
                carreras: 'Medicina, Biología, Enfermería',
                color: 'red',
                icon: 'bi-heart-pulse-fill',
              },
              {
                area: 'C',
                title: 'Ciencias\nEmpresariales',
                carreras: 'Economía, Contabilidad, Turismo',
                color: 'yellow',
                icon: 'bi-graph-up',
              },
              {
                area: 'D',
                title: 'Ciencias\nSociales',
                carreras: 'Derecho, Historia, Psicología, Educación',
                color: 'purple',
                icon: 'bi-bank',
              },
            ].map((area, index) => (
              <div
                key={index}
                className={`group relative flex flex-col p-8 h-64 rounded-3xl bg-gradient-to-br from-${area.color}-50 to-${area.color}-100 border-2 border-transparent hover:border-${area.color}-500 transition-all overflow-hidden hover:shadow-xl`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <i className={`${area.icon} text-8xl text-${area.color}-500`}></i>
                </div>
                <div className="mt-auto z-10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${area.color}-500 text-white flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <span className="text-2xl font-black">{area.area}</span>
                  </div>
                  <h3
                    className={`text-xl font-black text-secondary-900 group-hover:text-${area.color}-600 transition-colors uppercase leading-tight whitespace-pre-line`}
                  >
                    {area.title}
                  </h3>
                  <p className="text-xs font-medium text-secondary-600 mt-2">{area.carreras}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-maroon to-brand-maroon-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black mb-6">
              ¿Listo para Digitalizar tu Academia?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Únete a las academias que ya están transformando su gestión académica con Lumen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/login"
                className="flex items-center justify-center h-14 px-8 rounded-xl bg-white text-brand-maroon text-base font-bold hover:bg-brand-cream transition-all shadow-lg"
              >
                <i className="bi bi-box-arrow-in-right mr-2 text-xl"></i>
                Acceder al Sistema
              </Link>
              <a
                href="#caracteristicas"
                className="flex items-center justify-center h-14 px-8 rounded-xl bg-transparent border-2 border-white text-white text-base font-bold hover:bg-white/10 transition-all"
              >
                Conocer Más
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-br from-brand-maroon to-brand-maroon-dark text-white rounded-xl">
                  <i className="bi bi-mortarboard-fill text-2xl"></i>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl leading-tight text-brand-gold">Lumen</span>
                  <span className="text-xs font-medium tracking-wider uppercase text-secondary-400">
                    Sistema de Gestión Académica
                  </span>
                </div>
              </div>
              <p className="text-secondary-400 text-sm leading-relaxed max-w-md">
                Sistema especializado para academias preuniversitarias que preparan estudiantes para
                la UNSAAC. Gestión completa de matrículas, asistencia, evaluaciones y rankings.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-white">Sistema</h4>
              <a
                className="text-sm text-secondary-400 hover:text-brand-gold transition-colors"
                href="#inicio"
              >
                Inicio
              </a>
              <a
                className="text-sm text-secondary-400 hover:text-brand-gold transition-colors"
                href="#caracteristicas"
              >
                Características
              </a>
              <a
                className="text-sm text-secondary-400 hover:text-brand-gold transition-colors"
                href="#modalidades"
              >
                Modalidades
              </a>
              <a
                className="text-sm text-secondary-400 hover:text-brand-gold transition-colors"
                href="#areas"
              >
                Áreas
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-white">Soporte</h4>
              <a
                className="text-sm text-secondary-400 hover:text-brand-gold transition-colors flex items-center gap-2"
                href="#"
              >
                <i className="bi bi-envelope-fill text-sm"></i> soporte@lumen.edu.pe
              </a>
              <a
                className="text-sm text-secondary-400 hover:text-brand-gold transition-colors flex items-center gap-2"
                href="#"
              >
                <i className="bi bi-question-circle-fill text-sm"></i> Centro de Ayuda
              </a>
            </div>
          </div>
          <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-secondary-500">
              © 2025 Lumen. Sistema de Gestión Académica Preuniversitaria. Todos los derechos
              reservados.
            </p>
            <div className="flex gap-4 text-xs text-secondary-500">
              <a href="#" className="hover:text-brand-gold transition-colors">
                Términos de Uso
              </a>
              <span>•</span>
              <a href="#" className="hover:text-brand-gold transition-colors">
                Privacidad
              </a>
              <span>•</span>
              <a href="#" className="hover:text-brand-gold transition-colors">
                Ley N° 29733
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
