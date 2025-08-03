# FunEnglish 儿童英语启蒙网站技术栈与部署指南

## 🚀 技术栈概述

FunEnglish 儿童英语启蒙网站是基于现代前端技术栈开发的，旨在提供高性能、可维护且用户友好的体验。主要技术栈包括：

1.  **前端框架**: **React.js**
    *   一个用于构建用户界面的 JavaScript 库，以其组件化、声明式编程和高效的虚拟 DOM 而闻名。

2.  **构建工具**: **Vite**
    *   一个下一代前端工具，提供了极速的开发服务器和优化的构建性能。它比传统的打包工具（如 Webpack）更快，开发体验更流畅。

3.  **包管理工具**: **pnpm**
    *   一个快速、节省磁盘空间的包管理工具。它通过硬链接和符号链接来管理 `node_modules`，避免了重复安装依赖，提高了效率。

4.  **UI 组件库**: **Shadcn UI** (基于 Radix UI 和 Tailwind CSS)
    *   一个可定制的 UI 组件集合，提供了美观且可访问的组件，可以轻松集成到 React 项目中。

5.  **样式框架**: **Tailwind CSS**
    *   一个实用程序优先的 CSS 框架，通过直接在 HTML 中使用预定义的类来快速构建自定义设计，无需编写大量自定义 CSS。

6.  **图标库**: **Lucide React**
    *   一个开源的图标库，提供了大量可定制的 SVG 图标，方便在 React 项目中使用。

7.  **语音功能**: **浏览器原生 SpeechSynthesis API**
    *   网站的免费语音和点读功能是直接利用现代浏览器内置的 `SpeechSynthesisUtterance` API 实现的，无需依赖第三方付费服务，保证了功能的免费和可用性。

## 部署指南：在您自己的服务器上部署

由于 FunEnglish 是一个纯前端的 React 应用，部署过程相对简单，主要涉及构建静态文件并将其放置在您的 Web 服务器上。

### 步骤 1: 准备部署环境

确保您的服务器或本地机器上安装了以下软件：

*   **Node.js**: 推荐使用 LTS 版本 (例如 v18.x 或 v20.x)。您可以从 [Node.js 官网](https://nodejs.org/) 下载安装。
*   **pnpm**: 如果您没有安装 pnpm，可以通过 npm 安装：
    ```bash
    npm install -g pnpm
    ```
    或者使用 npm/yarn 替代 pnpm，但需要相应调整命令。

### 步骤 2: 获取网站源代码

您之前已经收到了 `kids-english-learning-optimized.zip` 压缩包。请将其下载到您的服务器或本地机器上，并解压：

```bash
# 假设您已将压缩包上传到服务器的 /home/user/ 目录
cd /home/user/
unzip kids-english-learning-optimized.zip
cd kids-english-learning
```

### 步骤 3: 安装依赖

进入项目根目录后，安装所有必要的项目依赖：

```bash
pnpm install
```

### 步骤 4: 构建生产环境文件

运行构建命令，Vite 会将您的 React 应用编译成优化的静态文件，这些文件将存放在 `dist` 目录下：

```bash
pnpm run build
```

构建成功后，您会在项目根目录下看到一个名为 `dist` 的文件夹。这个文件夹包含了所有用于部署的静态文件（HTML, CSS, JavaScript, 图片等）。

### 步骤 5: 部署静态文件

您可以使用任何 Web 服务器（如 Nginx, Apache, Caddy）或静态文件托管服务来部署 `dist` 文件夹中的内容。

#### 选项 A: 使用 Nginx (推荐)

1.  **安装 Nginx**: 如果您的服务器上没有安装 Nginx，请先安装它。
    *   Ubuntu/Debian:
        ```bash
        sudo apt update
        sudo apt install nginx
        ```
    *   CentOS/RHEL:
        ```bash
        sudo yum install nginx
        ```

2.  **配置 Nginx**: 创建一个新的 Nginx 配置文件（例如 `/etc/nginx/sites-available/funenglish.conf`），并添加以下内容：
    ```nginx
    server {
        listen 80;
        server_name your_domain.com; # 替换为您的域名或服务器IP地址

        root /path/to/your/kids-english-learning/dist; # 替换为您的 dist 文件夹的绝对路径
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # 可选：为静态文件设置缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
            expires 1y;
            log_not_found off;
        }
    }
    ```

3.  **启用配置**: 创建一个符号链接到 `sites-enabled` 目录，并测试 Nginx 配置：
    ```bash
    sudo ln -s /etc/nginx/sites-available/funenglish.conf /etc/nginx/sites-enabled/
    sudo nginx -t
    ```

4.  **重启 Nginx**: 如果测试通过，重启 Nginx 服务使配置生效：
    ```bash
    sudo systemctl restart nginx
    ```

#### 选项 B: 使用 Apache

1.  **安装 Apache**: 如果您的服务器上没有安装 Apache，请先安装它。
    *   Ubuntu/Debian:
        ```bash
        sudo apt update
        sudo apt install apache2
        ```

2.  **配置 Apache**: 编辑您的 Apache 虚拟主机配置文件（通常在 `/etc/apache2/sites-available/000-default.conf` 或创建一个新的），并修改 `DocumentRoot` 指向您的 `dist` 文件夹：
    ```apache
    <VirtualHost *:80>
        ServerAdmin webmaster@localhost
        DocumentRoot /path/to/your/kids-english-learning/dist # 替换为您的 dist 文件夹的绝对路径
        ServerName your_domain.com # 替换为您的域名或服务器IP地址

        <Directory /path/to/your/kids-english-learning/dist>
            Options Indexes FollowSymLinks
            AllowOverride All
            Require all granted
        </Directory>

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # 用于处理单页应用路由
        RewriteEngine On
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]

    </VirtualHost>
    ```

3.  **启用 Rewrite 模块并重启 Apache**: 
    ```bash
    sudo a2enmod rewrite
    sudo systemctl restart apache2
    ```

#### 选项 C: 使用 `serve` (仅用于简单测试或本地部署)

如果您只是想快速在本地测试或在没有 Nginx/Apache 的情况下简单部署，可以使用 `serve` 包：

1.  **安装 `serve`**: 
    ```bash
    pnpm install -g serve
    ```

2.  **启动服务**: 在 `dist` 文件夹的上一级目录运行：
    ```bash
    serve -s kids-english-learning/dist
    ```
    这将在默认端口（通常是 3000 或 5000）启动一个 Web 服务器，您可以通过浏览器访问 `http://localhost:3000` (或相应端口)。

### 步骤 6: 访问您的网站

完成上述部署步骤后，您就可以通过配置的域名或服务器 IP 地址在浏览器中访问您的儿童英语启蒙网站了。

希望这些信息能帮助您顺利部署和管理您的网站！如果您在部署过程中遇到任何问题，可以随时向我提问。

