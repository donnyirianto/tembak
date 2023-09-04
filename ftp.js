const ftp = require("basic-ftp");

const ftpHost = "172.24.16.131";
const ftpPort = 7776;
const ftpUser = "ftpuser";
const ftpPass = "xftpuserx";

async function listFtpDirectory() {
  const client = new ftp.Client();
  try {
    await client.access({
      host: ftpHost,
      port: ftpPort,
      user: ftpUser,
      password: ftpPass,
    });
    await client.cd('/home/ftpuser/data');
    const list = await client.list();

    if (list.length === 0) {
        console.log("The directory is empty.");
      } else {
        for (const item of list) {
            
          if (item.isDirectory) {
            console.log(`[D] ${item.name}`);
            await client.cd(item.name);
            const subList = await client.list();
            for (const subItem of subList) {
              console.log(`  - ${subItem.name}`);
            }
            await client.cd(".."); // Go back to the parent directory
          } else {
            console.log(`[F] ${item.name}`);
          }
        }
      }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    client.close();
  }
}

listFtpDirectory();
