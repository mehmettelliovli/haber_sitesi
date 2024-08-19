# Kullanılacak temel imajı belirleyin
FROM node

# Uygulama dizinini oluşturun ve çalışma dizinini ayarlayın
WORKDIR /reservation_project_be

# Paket dosyalarını ve diğer bağımlılıkları kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin
RUN npm install

# Uygulama kaynak kodunu kopyalayın
COPY . .

# Uygulama çalışacağı portu belirtin
EXPOSE 3000

# Uygulamayı başlatmak için komutu belirtin
CMD ["npm", "start"]
