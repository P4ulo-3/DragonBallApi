// 🌸 Script GitPush by Paulin GPT 😍
import { execSync } from "child_process";

// Captura a mensagem passada como argumento
const message = process.argv.slice(2).join(" ");

if (!message) {
  console.log("❌ Nenhuma mensagem informada!");
  console.log('👉 Uso: npm run gitpush "mensagem do commit"');
  process.exit(1);
}

console.log("\n🚀 Iniciando processo de commit e push...\n");

try {
  console.log("📦 Adicionando arquivos...");
  execSync("git add .", { stdio: "inherit" });

  console.log(`📝 Criando commit: "${message}"`);
  execSync(`git commit -m "${message}"`, { stdio: "inherit" });

  console.log("🌍 Enviando para o repositório remoto...");
  execSync("git push", { stdio: "inherit" });

  console.log("\n✅ Push realizado com sucesso por Paulin GPT 💖\n");
} catch (error) {
  console.error("\n⚠️ Ocorreu um erro durante o processo!");
  process.exit(1);
}
