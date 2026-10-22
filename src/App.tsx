import { useState } from 'react';
import {
  Cloud,
  Network,
  Settings,
  Server,
  ShieldCheck,
  Layers,
  Home,
  Compass,
  MessageCircleQuestion,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Send,
  Info,
  BrainCircuit,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  Trophy,
} from 'lucide-react';
import { topicCards, suggestedTopics, lessons, topicGuides, type Lesson } from '@/data/lessons';
import { quizQuestions } from '@/data/quiz';

type View = 'home' | 'explore' | 'ask' | 'quiz';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Network,
  Settings,
  Server,
  ShieldCheck,
  Layers,
};

const navItems: { id: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore Topics', icon: Compass },
  { id: 'ask', label: 'Ask AI', icon: MessageCircleQuestion },
  { id: 'quiz', label: 'Practice Quiz', icon: BrainCircuit },
];

function findLessonForQuestion(submittedQuestion: string): Lesson | null {
  const normalizedQuestion = submittedQuestion.toLowerCase();
  const matches: [string, string[]][] = [
    ['virtual-machines', ['virtual machine', 'vm']],
    ['cloud-computing', ['cloud computing', 'cloud']],
    ['availability-zones', ['availability zone', 'availability zones']],
    ['iaas-paas-saas', ['iaas', 'paas', 'saas']],
  ];

  const match = matches.find(([, keywords]) =>
    keywords.some((keyword) => normalizedQuestion.includes(keyword))
  );
  return match ? lessons[match[0]] : null;
}

function App() {
  const [view, setView] = useState<View>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(lessons['virtual-machines']);
  const [selectedTopicId, setSelectedTopicId] = useState('cloud-concepts');
  const [question, setQuestion] = useState('');
  const [askedQuestion, setAskedQuestion] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [askNotice, setAskNotice] = useState<string | null>(null);
  const [answer, setAnswer] = useState<Lesson | null>(null);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const resetQuiz = () => {
    setQuizQuestionIndex(0);
    setQuizSelectedAnswer(null);
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizComplete(false);
  };

  const handleSubmitQuizAnswer = () => {
    if (quizSelectedAnswer === null || quizSubmitted) return;
    setQuizSubmitted(true);
    if (quizSelectedAnswer === quizQuestions[quizQuestionIndex].correctAnswer) {
      setQuizScore((score) => score + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizQuestionIndex === quizQuestions.length - 1) {
      setQuizComplete(true);
      return;
    }
    setQuizQuestionIndex((index) => index + 1);
    setQuizSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  const handleSelectTopic = (id: string) => {
    const topicGuide = topicGuides[id];
    if (topicGuide) {
      setSelectedTopicId(id);
      setView('explore');
      setSidebarOpen(false);
      return;
    }

    const lesson = lessons[id];
    if (lesson) {
      setActiveLesson(lesson);
      setView('home');
      setSidebarOpen(false);
    }
  };

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    const submittedQuestion = question.trim();
    if (!submittedQuestion || isThinking) return;

    const matchedLesson = findLessonForQuestion(submittedQuestion);
    setAskedQuestion(submittedQuestion);
    setAnswer(null);
    setAskNotice(null);
    setIsThinking(true);
    setView('ask');

    window.setTimeout(() => {
      setIsThinking(false);
      setAnswer(matchedLesson);
      if (!matchedLesson) {
        setAskNotice(
          "I do not have a saved lesson for that question yet. Try asking about Virtual Machines, Cloud Computing, Availability Zones, or IaaS, PaaS, and SaaS."
        );
      }
    }, 700);
  };

  const navigate = (v: View) => {
    setView(v);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-navy-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-navy-900 border-r border-navy-800 flex flex-col z-40 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <button
          type="button"
          onClick={() => navigate('home')}
          className="flex items-center gap-3 px-6 py-6 border-b border-navy-800 text-left hover:bg-navy-800/50 transition"
          aria-label="Go to CloudBuddy AI home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-400 to-accent-500 flex items-center justify-center shadow-soft">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-base leading-tight">CloudBuddy AI</h1>
            <p className="text-xs text-navy-300">Your AZ-900 study buddy</p>
          </div>
        </button>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-navy-700 text-white shadow-soft'
                    : 'text-navy-200 hover:bg-navy-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-accent-400' : ''}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-5 border-t border-navy-800">
          <div className="rounded-xl bg-navy-800/60 p-4">
            <div className="flex items-center gap-2 text-accent-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Study Tip</span>
            </div>
            <p className="text-xs text-navy-200 leading-relaxed">
              Learn one concept a day. Consistency beats cramming for the AZ-900 exam.
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden sticky top-0 z-20 bg-navy-900/90 backdrop-blur border-b border-navy-800 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            className="p-2 rounded-lg hover:bg-navy-800 transition"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={() => navigate('home')}
            className="flex items-center gap-2 rounded-lg hover:opacity-90 transition"
            aria-label="Go to CloudBuddy AI home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-400 to-accent-500 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm">CloudBuddy AI</span>
          </button>
        </header>

        <main className="flex-1 px-4 sm:px-8 py-8 max-w-6xl w-full mx-auto">
          {view === 'home' && (
            <HomeView
              onSelectTopic={handleSelectTopic}
              onAskClick={() => navigate('ask')}
              activeLesson={activeLesson}
              question={question}
              setQuestion={setQuestion}
              onAsk={handleAsk}
            />
          )}
          {view === 'explore' && (
            <ExploreView selectedTopicId={selectedTopicId} onSelectTopic={handleSelectTopic} onBackHome={() => navigate('home')} />
          )}
          {view === 'quiz' && (
            <QuizView
              questionIndex={quizQuestionIndex}
              selectedAnswer={quizSelectedAnswer}
              submitted={quizSubmitted}
              score={quizScore}
              complete={quizComplete}
              onSelectAnswer={setQuizSelectedAnswer}
              onSubmitAnswer={handleSubmitQuizAnswer}
              onNextQuestion={handleNextQuizQuestion}
              onRestart={resetQuiz}
              onBackHome={() => navigate('home')}
            />
          )}
          {view === 'ask' && (
            <AskView
              question={question}
              setQuestion={setQuestion}
              onAsk={handleAsk}
              isThinking={isThinking}
              askNotice={askNotice}
              askedQuestion={askedQuestion}
              answer={answer}
              onBackHome={() => navigate('home')}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-navy-800 px-6 py-5 text-center">
          <p className="text-xs text-navy-300 max-w-2xl mx-auto leading-relaxed">
            CloudBuddy AI is an independent, unofficial study tool. It is not affiliated with or
            endorsed by Microsoft.
          </p>
        </footer>
      </div>
    </div>
  );
}

function HomeView({
  onSelectTopic,
  onAskClick,
  activeLesson,
  question,
  setQuestion,
  onAsk,
}: {
  onSelectTopic: (id: string) => void;
  onAskClick: () => void;
  activeLesson: Lesson | null;
  question: string;
  setQuestion: (v: string) => void;
  onAsk: (e: React.FormEvent) => void;
}) {
  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero */}
      <section className="text-center pt-6 pb-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/60 border border-navy-700 text-xs text-navy-200 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-accent-400" />
          AZ-900 Fundamentals, explained simply
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
          Let's make the cloud{' '}
          <span className="bg-gradient-to-r from-accent-400 to-navy-300 bg-clip-text text-transparent">
            make sense.
          </span>
        </h1>
        <p className="mt-4 text-navy-200 text-base sm:text-lg max-w-2xl mx-auto">
          Your personal companion for understanding Azure, one concept at a time.
        </p>

        {/* Question input */}
        <form onSubmit={onAsk} className="mt-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 bg-navy-800/70 border border-navy-700 rounded-2xl p-2 shadow-soft focus-within:border-accent-500 focus-within:shadow-glow transition-all">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What Azure concept would you like explained?"
              className="flex-1 bg-transparent px-4 py-3 text-sm placeholder-navy-300 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!question.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-navy-500 to-accent-500 text-white text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask CloudBuddy</span>
            </button>
          </div>
        </form>
      </section>

      {/* Topic cards */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent-400" />
          Core Topics
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topicCards.map((card) => {
            const Icon = iconMap[card.icon] ?? Cloud;
            return (
              <button
                key={card.id}
                onClick={() => onSelectTopic(card.id)}
                className="group text-left p-5 rounded-2xl bg-navy-800/50 border border-navy-700 hover:border-accent-500 hover:bg-navy-800 transition-all shadow-soft hover:shadow-card hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-xl bg-navy-700 group-hover:bg-accent-500/20 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-6 h-6 text-accent-400" />
                </div>
                <h3 className="font-semibold mb-1">{card.title}</h3>
                <p className="text-sm text-navy-200 leading-relaxed">{card.description}</p>
                <div className="mt-3 flex items-center gap-1 text-accent-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Start learning */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent-400" />
          Start learning
        </h2>
        <div className="flex flex-wrap gap-3">
          {suggestedTopics.map((t) => {
            const Icon = iconMap[t.icon] ?? Cloud;
            const active = activeLesson?.id === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTopic(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  active
                    ? 'bg-accent-500/20 border-accent-500 text-white'
                    : 'bg-navy-800/50 border-navy-700 text-navy-100 hover:border-accent-500 hover:bg-navy-800'
                }`}
              >
                <Icon className="w-4 h-4 text-accent-400" />
                {t.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Study panel */}
      {activeLesson && <StudyPanel lesson={activeLesson} onAskClick={onAskClick} />}
    </div>
  );
}

function StudyPanel({ lesson, onAskClick }: { lesson: Lesson; onAskClick: () => void }) {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-navy-800/80 to-navy-900/80 border border-navy-700 shadow-card overflow-hidden animate-fadeIn">
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-3 py-1 rounded-full bg-accent-500/20 text-accent-300 text-xs font-medium">
            {lesson.category}
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>

        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-wide mb-2">
              Simple explanation
            </h3>
            <p className="text-navy-100 leading-relaxed">{lesson.explanation}</p>
          </div>

          <div className="p-4 rounded-xl bg-navy-700/40 border border-navy-700">
            <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-wide mb-2 flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Real-world African example
            </h3>
            <p className="text-navy-100 leading-relaxed italic">{lesson.africanExample}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-wide mb-2">
              Key takeaways
            </h3>
            <ul className="space-y-2">
              {lesson.takeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-navy-100">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-400 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={onAskClick}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-navy-500 to-accent-500 text-white font-medium text-sm hover:opacity-90 transition shadow-soft"
        >
          <MessageCircleQuestion className="w-5 h-5" />
          Ask CloudBuddy
        </button>
      </div>
    </section>
  );
}

function AnswerCard({ lesson }: { lesson: Lesson }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-navy-800/80 to-navy-900/80 border border-navy-700 shadow-card p-6 sm:p-8 animate-fadeIn">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full bg-accent-500/20 text-accent-300 text-xs font-medium">
          {lesson.category}
        </span>
        <span className="text-xs text-navy-300">Sample lesson</span>
      </div>
      <h2 className="text-xl font-bold mb-4">{lesson.title}</h2>
      <div className="space-y-5">
        <div>
          <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-wide mb-2">
            Simple explanation
          </h3>
          <p className="text-navy-100 leading-relaxed">{lesson.explanation}</p>
        </div>
        <div className="p-4 rounded-xl bg-navy-700/40 border border-navy-700">
          <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-wide mb-2 flex items-center gap-2">
            <Compass className="w-4 h-4" />
            Real-world African example
          </h3>
          <p className="text-navy-100 leading-relaxed italic">{lesson.africanExample}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-wide mb-2">
            Key takeaways
          </h3>
          <ul className="space-y-2">
            {lesson.takeaways.map((takeaway) => (
              <li key={takeaway} className="flex items-start gap-2 text-navy-100">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-400 shrink-0" />
                {takeaway}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ExploreView({
  selectedTopicId,
  onSelectTopic,
  onBackHome,
}: {
  selectedTopicId: string;
  onSelectTopic: (id: string) => void;
  onBackHome: () => void;
}) {
  const selectedGuide = topicGuides[selectedTopicId] ?? topicGuides['cloud-concepts'];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm text-navy-300 hover:text-white transition"
        >
          <Home className="w-4 h-4" />
          Back to dashboard
        </button>
      </div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Explore Topics</h1>
        <p className="text-navy-200 mt-2">
          Choose a topic for concise notes, simple explanations, and a practical example.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {topicCards.map((card) => {
          const Icon = iconMap[card.icon] ?? Cloud;
          const active = selectedGuide.id === card.id;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectTopic(card.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                active
                  ? 'bg-accent-500/15 border-accent-500 shadow-soft'
                  : 'bg-navy-800/50 border-navy-700 hover:border-accent-500 hover:bg-navy-800'
              }`}
            >
              <Icon className="w-5 h-5 text-accent-400 mb-3" />
              <h2 className="font-semibold text-sm">{card.title}</h2>
            </button>
          );
        })}
      </div>

      <section className="rounded-2xl bg-navy-800/50 border border-navy-700 shadow-card p-6 sm:p-8">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-accent-500/15 flex items-center justify-center shrink-0">
            {(() => {
              const Icon = iconMap[topicCards.find((card) => card.id === selectedGuide.id)?.icon ?? 'Cloud'] ?? Cloud;
              return <Icon className="w-6 h-6 text-accent-400" />;
            })()}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-400">AZ-900 study notes</p>
            <h2 className="text-2xl font-bold mt-1">{selectedGuide.title}</h2>
            <p className="text-navy-200 mt-2 leading-relaxed">{selectedGuide.summary}</p>
          </div>
        </div>

        <div className="grid gap-3">
          {selectedGuide.concepts.map((concept) => (
            <div key={concept.name} className="rounded-xl bg-navy-900/50 border border-navy-700 p-4">
              <h3 className="font-semibold mb-1">{concept.name}</h3>
              <p className="text-sm text-navy-200 leading-relaxed">{concept.explanation}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl bg-navy-700/40 border border-navy-700 p-4">
          <h3 className="text-sm font-semibold text-accent-400 uppercase tracking-wide mb-2">Practical example</h3>
          <p className="text-navy-100 leading-relaxed">{selectedGuide.example}</p>
        </div>
      </section>

      {Object.values(lessons).some(
        (lesson) => lesson.category === topicCards.find((card) => card.id === selectedGuide.id)?.title
      ) && (
        <section>
          <h2 className="text-lg font-semibold mb-3">Related lessons</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {Object.values(lessons)
              .filter((lesson) => lesson.category === topicCards.find((card) => card.id === selectedGuide.id)?.title)
              .map((lesson) => (
                <button
                  key={lesson.id}
                  type="button"
                  onClick={() => onSelectTopic(lesson.id)}
                  className="text-left p-4 rounded-xl bg-navy-800/50 border border-navy-700 hover:border-accent-500 hover:bg-navy-800 transition-all shadow-soft hover:shadow-card"
                >
                  <h3 className="font-semibold mb-1">{lesson.title}</h3>
                  <p className="text-sm text-navy-200 line-clamp-2">{lesson.explanation}</p>
                </button>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}

function QuizView({
  questionIndex,
  selectedAnswer,
  submitted,
  score,
  complete,
  onSelectAnswer,
  onSubmitAnswer,
  onNextQuestion,
  onRestart,
  onBackHome,
}: {
  questionIndex: number;
  selectedAnswer: number | null;
  submitted: boolean;
  score: number;
  complete: boolean;
  onSelectAnswer: (answer: number) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  onRestart: () => void;
  onBackHome: () => void;
}) {
  if (complete) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fadeIn">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm text-navy-300 hover:text-white transition mb-8"
        >
          <Home className="w-4 h-4" />
          Back to dashboard
        </button>
        <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-500/20 flex items-center justify-center mb-5">
          <Trophy className="w-8 h-8 text-accent-400" />
        </div>
        <p className="text-sm font-semibold text-accent-400 uppercase tracking-wide">Quiz complete</p>
        <h1 className="text-3xl sm:text-4xl font-bold mt-2">You scored {score} out of {quizQuestions.length}</h1>
        <p className="text-navy-200 mt-3">
          Every question is a chance to strengthen your cloud foundation. Review the lessons and try again to improve your score.
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-navy-500 to-accent-500 text-white text-sm font-medium hover:opacity-90 transition"
        >
          <RotateCcw className="w-4 h-4" />
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[questionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm text-navy-300 hover:text-white transition"
        >
          <Home className="w-4 h-4" />
          Back to dashboard
        </button>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800/60 border border-navy-700 text-xs text-navy-200 mb-4">
            <BrainCircuit className="w-3.5 h-3.5 text-accent-400" />
            AZ-900 practice quiz
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">Test your cloud knowledge</h1>
        </div>
        <span className="text-sm text-navy-200">Question {questionIndex + 1} of {quizQuestions.length}</span>
      </div>

      <div className="h-2 rounded-full bg-navy-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-navy-400 to-accent-500 transition-all duration-300"
          style={{ width: `${((questionIndex + 1) / quizQuestions.length) * 100}%` }}
        />
      </div>

      <section className="rounded-2xl bg-navy-800/50 border border-navy-700 shadow-card p-5 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-400">{currentQuestion.category}</span>
        <h2 className="text-xl sm:text-2xl font-semibold leading-snug mt-3">{currentQuestion.question}</h2>

        <div className="mt-6 space-y-3">
          {currentQuestion.choices.map((choice, index) => {
            const selected = selectedAnswer === index;
            const correct = submitted && index === currentQuestion.correctAnswer;
            const incorrect = submitted && selected && !correct;
            return (
              <button
                key={choice}
                type="button"
                disabled={submitted}
                onClick={() => onSelectAnswer(index)}
                className={`w-full flex items-start gap-3 text-left p-4 rounded-xl border transition-all ${
                  correct
                    ? 'border-emerald-400/70 bg-emerald-400/10'
                    : incorrect
                      ? 'border-red-400/70 bg-red-400/10'
                      : selected
                        ? 'border-accent-400 bg-accent-500/15'
                        : 'border-navy-700 bg-navy-900/40 hover:border-accent-500 hover:bg-navy-800'
                } ${submitted ? 'cursor-default' : ''}`}
              >
                <span className="w-7 h-7 rounded-lg bg-navy-700 flex items-center justify-center text-sm font-semibold shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm sm:text-base text-navy-100 pt-1">{choice}</span>
                {correct && <CheckCircle2 className="w-5 h-5 text-emerald-400 ml-auto shrink-0" />}
                {incorrect && <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />}
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <button
            type="button"
            onClick={onSubmitAnswer}
            disabled={selectedAnswer === null}
            className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-navy-500 to-accent-500 text-white text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Submit Answer
          </button>
        ) : (
          <div className={`mt-6 rounded-xl border p-4 ${isCorrect ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-red-400/40 bg-red-400/10'}`}>
            <div className="flex items-center gap-2 font-semibold text-sm">
              {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
              {isCorrect ? 'Correct answer' : `Not quite. The correct answer is ${currentQuestion.choices[currentQuestion.correctAnswer]}.`}
            </div>
            <p className="text-sm text-navy-100 leading-relaxed mt-2">{currentQuestion.explanation}</p>
            <button
              type="button"
              onClick={onNextQuestion}
              className="mt-4 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-navy-700 text-white text-sm font-medium hover:bg-navy-600 transition"
            >
              {questionIndex === quizQuestions.length - 1 ? 'See Final Score' : 'Next Question'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      <div className="text-center">
        <button type="button" onClick={onRestart} className="inline-flex items-center gap-2 text-sm text-navy-300 hover:text-white transition">
          <RotateCcw className="w-4 h-4" />
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

function AskView({
  question,
  setQuestion,
  onAsk,
  isThinking,
  askNotice,
  askedQuestion,
  answer,
  onBackHome,
}: {
  question: string;
  setQuestion: (v: string) => void;
  onAsk: (e: React.FormEvent) => void;
  isThinking: boolean;
  askNotice: string | null;
  askedQuestion: string | null;
  answer: Lesson | null;
  onBackHome: () => void;
}) {
  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onBackHome}
          className="inline-flex items-center gap-2 text-sm text-navy-300 hover:text-white transition"
        >
          <Home className="w-4 h-4" />
          Back to dashboard
        </button>
      </div>
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/60 border border-navy-700 text-xs text-navy-200 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-accent-400" />
          Ask your AI study buddy
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold">Ask CloudBuddy</h1>
        <p className="text-navy-200 mt-2">
          Type any Azure question below. CloudBuddy will explain it in plain language with a
          relatable example.
        </p>
      </div>

      <form onSubmit={onAsk} className="flex items-center gap-2 bg-navy-800/70 border border-navy-700 rounded-2xl p-2 shadow-soft focus-within:border-accent-500 focus-within:shadow-glow transition-all">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. What is a region in Azure?"
          className="flex-1 bg-transparent px-4 py-3 text-sm placeholder-navy-300 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!question.trim() || isThinking}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-navy-500 to-accent-500 text-white text-sm font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {isThinking ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="hidden sm:inline">Thinking...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Ask</span>
            </>
          )}
        </button>
      </form>

      {askedQuestion && (
        <div className="ml-auto max-w-[80%] px-4 py-3 rounded-2xl bg-navy-700 border border-navy-600 text-sm">
          {askedQuestion}
        </div>
      )}

      {isThinking && (
        <div className="flex items-center gap-3 text-navy-200 text-sm animate-pulseSoft">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-400 to-accent-500 flex items-center justify-center">
            <Cloud className="w-4 h-4 text-white" />
          </div>
          CloudBuddy is thinking...
        </div>
      )}

      {answer && !isThinking && <AnswerCard lesson={answer} />}

      {askNotice && !isThinking && (
        <div className="flex gap-3 animate-fadeIn">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-400 to-accent-500 flex items-center justify-center shrink-0">
            <Cloud className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 px-4 py-3 rounded-2xl bg-navy-800/60 border border-navy-700">
            <div className="flex items-center gap-2 text-accent-400 text-xs font-semibold mb-1">
              <Info className="w-3.5 h-3.5" />
              Heads up
            </div>
            <p className="text-sm text-navy-100 leading-relaxed">{askNotice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
