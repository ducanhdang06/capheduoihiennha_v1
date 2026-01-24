-- =========================================
-- Coffee Shop Menu Database Schema
-- PostgreSQL
-- =========================================

-- ---------- categories ----------
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_order INT NOT NULL DEFAULT 0
);

-- ---------- drinks ----------
CREATE TABLE drinks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price INT NOT NULL,
    category_id INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);

-- ---------- tags ----------
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- ---------- drink_tags ----------
CREATE TABLE drink_tags (
    drink_id INT NOT NULL,
    tag_id INT NOT NULL,

    PRIMARY KEY (drink_id, tag_id),

    CONSTRAINT fk_drink
        FOREIGN KEY (drink_id)
        REFERENCES drinks(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_tag
        FOREIGN KEY (tag_id)
        REFERENCES tags(id)
        ON DELETE CASCADE
);

-- ---------- drink_images ----------
CREATE TABLE drink_images (
    id SERIAL PRIMARY KEY,
    drink_id INT NOT NULL,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_drink_image
        FOREIGN KEY (drink_id)
        REFERENCES drinks(id)
        ON DELETE CASCADE
);

-- ---------- menu_sections (optional) ----------
CREATE TABLE menu_sections (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('category', 'tag')),
    reference_id INT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- =========================================
-- Seed Data
-- =========================================

-- Categories
INSERT INTO categories (name, display_order) VALUES
('Cà Phê Pha Máy', 1),
('Cà Phê Truyền Thống', 2),
('Trà Ủ Lạnh', 3),
('Trà Sữa', 4),
('Trà Trái Cây', 5),
('Matcha', 6),
('Socola', 7),
('Sữa Chua Dẻo', 8),
('Nước Ép', 9);


-- Tags
INSERT INTO tags (name) VALUES
('New'),
('Popular');