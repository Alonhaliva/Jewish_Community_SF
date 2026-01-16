-- Create table for storing daily tech news articles
CREATE TABLE IF NOT EXISTS news_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  link TEXT NOT NULL UNIQUE,
  description TEXT,
  source TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_news_articles_created_at ON news_articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_articles_is_active ON news_articles(is_active) WHERE is_active = true;

-- Insert sample articles if table is empty
INSERT INTO news_articles (title, link, description, source, published_at)
SELECT 
  'Israeli Cybersecurity Startup Wiz Reaches $12B Valuation',
  'https://techcrunch.com/israeli-wiz-valuation',
  'Wiz, the cloud security startup founded by Israeli entrepreneurs, continues its rapid growth in Silicon Valley market.',
  'TechCrunch',
  NOW() - INTERVAL '2 hours'
WHERE NOT EXISTS (SELECT 1 FROM news_articles LIMIT 1);

INSERT INTO news_articles (title, link, description, source, published_at)
SELECT 
  'Monday.com Expands Bay Area Operations',
  'https://www.calcalistech.com/monday-expansion',
  'Israeli work management platform Monday.com opens new offices in San Francisco to support growing enterprise customer base.',
  'Calcalist',
  NOW() - INTERVAL '5 hours'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE source = 'Calcalist');

INSERT INTO news_articles (title, link, description, source, published_at)
SELECT 
  'Israeli AI Startups Attract Record Funding in Q1',
  'https://www.globes.co.il/en/israeli-ai-funding',
  'Israeli artificial intelligence companies raised over $2B in first quarter, with majority of deals involving Silicon Valley VCs.',
  'Globes',
  NOW() - INTERVAL '8 hours'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE source = 'Globes');

INSERT INTO news_articles (title, link, description, source, published_at)
SELECT 
  'Check Point Software Announces New Bay Area R&D Center',
  'https://www.ynetnews.com/business/checkpoint-rd',
  'Veteran Israeli cybersecurity firm invests $50M in new research and development facility in Palo Alto.',
  'Ynetnews',
  NOW() - INTERVAL '12 hours'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE source = 'Ynetnews');

INSERT INTO news_articles (title, link, description, source, published_at)
SELECT 
  'Israeli Founders Lead Latest Sequoia Capital Investments',
  'https://www.jpost.com/business/sequoia-israeli-founders',
  'Top Silicon Valley VC firm Sequoia Capital backs three new Israeli-founded startups in latest investment round.',
  'Jerusalem Post',
  NOW() - INTERVAL '15 hours'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE source = 'Jerusalem Post');

INSERT INTO news_articles (title, link, description, source, published_at)
SELECT 
  'Mobileye Tests Autonomous Vehicles in Silicon Valley',
  'https://techcrunch.com/mobileye-autonomous-testing',
  'Intel-owned Israeli autonomous driving company expands testing program to Bay Area streets.',
  'TechCrunch',
  NOW() - INTERVAL '18 hours'
WHERE NOT EXISTS (SELECT 1 FROM news_articles WHERE title LIKE '%Mobileye%');
