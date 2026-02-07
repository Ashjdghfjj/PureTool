import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GitCompare } from 'lucide-react';
import * as Diff from 'diff';
import SEO from '@/components/SEO';

export default function DiffChecker() {
  const { t } = useTranslation();
  const [oldText, setOldText] = useState('');
  const [newText, setNewText] = useState('');
  const [diffResult, setDiffResult] = useState<Diff.Change[]>([]);

  const handleDiff = () => {
    const diff = Diff.diffLines(oldText, newText);
    setDiffResult(diff);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 flex flex-col items-center">
      <SEO 
        title={t('diff.title')}
        description={t('diff.desc')}
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <GitCompare className="h-8 w-8 text-primary" />
          {t('diff.title')}
        </h1>
        <p className="text-muted-foreground">{t('diff.desc')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 w-full mb-8">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('diff.original')}</label>
          <textarea
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            className="w-full h-64 rounded-xl border border-input bg-background px-3 py-2 text-sm font-mono resize-none focus:ring-2 focus:ring-primary"
            placeholder={t('diff.originalPlaceholder')}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('diff.modified')}</label>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full h-64 rounded-xl border border-input bg-background px-3 py-2 text-sm font-mono resize-none focus:ring-2 focus:ring-primary"
            placeholder={t('diff.modifiedPlaceholder')}
          />
        </div>
      </div>

      <button
        onClick={handleDiff}
        className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-lg font-bold text-lg transition-all shadow-md hover:shadow-xl mb-12"
      >
        {t('diff.compare')}
      </button>

      {diffResult.length > 0 && (
        <div className="w-full bg-card border rounded-xl p-6 shadow-sm overflow-x-auto dark:bg-zinc-900/50">
          <pre className="font-mono text-sm whitespace-pre-wrap">
            {diffResult.map((part, index) => {
              const color = part.added ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' :
                part.removed ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' : 
                'text-muted-foreground';
              
              return (
                <span key={index} className={color}>
                  {part.value}
                </span>
              );
            })}
          </pre>
        </div>
      )}
    </div>
  );
}
