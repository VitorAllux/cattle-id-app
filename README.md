# Cattle-ID App (React Native)

Aplicativo móvel que consome a API do **[Cattle-ID Platform](https://cattle-id-platform-production.up.railway.app/api)** para identificação e registro de bovinos via NFC.

> **Dica rápida**  
> Se você só quer testar: na raiz já existe **`app-release.apk`** apontando para a API *on-line* de demonstração. Basta instalar no celular.

---

## Requisitos

| Ferramenta            | Versão recomendada                |
|-----------------------|-----------------------------------|
| Node.js               | **≥ 18**                          |
| npm / Yarn / pnpm     | use o gerenciador de sua escolha  |
| JDK                   | 17 (compilação Android 33+)       |
| Android Studio        | SDK + AVD / drivers USB           |
| React Native CLI      | instalado via `npx` (já incluso)  |
| ADB                   | já vem com o Android SDK          |

> No Windows, coloque **`adb`** e **`java`** no `PATH`.  
> No Linux/macOS, use `sdkmanager` para instalar `platform-tools` e `build-tools`.

---

## Instalação e execução (debug)

```bash
# 1. Clone
git clone https://github.com/VitorAllux/cattle-id-app.git
cd cattle-id-app

# 2. Dependências JS
npm install          # ou yarn / pnpm install

# 3. Config de ambiente
cp .environmentexample environment.js
# edite API_URL para o IP do backend na rede Wi-Fi

# 4. Limpar e rodar no dispositivo via USB/WIFI ou emulador(não suporta leitura nfc atualmente)
cd android
./gradlew clean
cd ..
npx react-native run-android

# 5. Gerar APK
cd android
./gradlew assembleRelease           # gera o APK e o arquivo é salvo em android/app/build/outputs/apk/release/