CREATE TABLE IF NOT EXISTS app_data (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO app_data (content) VALUES ('Sample data');
