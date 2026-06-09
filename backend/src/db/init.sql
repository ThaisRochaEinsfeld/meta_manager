CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS goals (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  frequency TEXT NOT NULL,
  target TEXT,
  completed BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  target_days_per_week INTEGER,
  color TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE goals ADD COLUMN IF NOT EXISTS completed BOOLEAN DEFAULT false;
ALTER TABLE goals ADD COLUMN IF NOT EXISTS target_days_per_week INTEGER;
ALTER TABLE goals ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#3b82f6';
ALTER TABLE goals ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

INSERT INTO users (name, email, password)
VALUES ('MetaManager Admin', 'MetaManagerAdmin', 'Password12@')
ON CONFLICT (email) DO NOTHING;
