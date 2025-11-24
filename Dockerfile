# --- Development image ---
FROM oven/bun:1 AS dev

WORKDIR /app

# Salin dependency file
COPY bun.lock package.json ./

# Instal dependency
RUN bun install

# Salin semua source code
COPY . .

# Expose port container
EXPOSE 3000

# Jalankan Bun dengan hot reload
CMD ["bun", "run", "dev"]
