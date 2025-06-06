sudo apt-get update -y 
sudo apt-get install -y git nginx curl 

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - 
sudo apt-get install -y nodejs 

git clone https://github.com/Michal58/WebRadioApp.git 

cd /home/ubuntu/WebRadioApp
npm install 
npm run build 

sudo rm -rf /var/www/html/* 
sudo cp -r build/* /var/www/html/ 
sudo bash -c 'cat > /etc/nginx/sites-available/default <<EOL 
server { 
listen 80 default_server; 
server_name _; 
root /var/www/html; 
index index.html; 
location / { 
try_files \$uri /index.html; 
} 
} 
EOL' 
sudo systemctl restart nginx