 
CREATE TABLE IF NOT EXISTS user (
  id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  role_id INT REFERENCES user_role(id),
  position TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  login TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  photo_url TEXT DEFAULT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  guid TEXT,
  registration_date TIMESTAMP Not NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP,
);