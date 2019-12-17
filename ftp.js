const ftp = require('basic-ftp');
const fs = require('fs');

class FTPClient {
  constructor(host = 'localhost', port = 10021, username = 'vkravchik', password = 'vadim12335', secure = false) {
    this.client = new ftp.Client();
    this.settings = {
      host: host,
      port: port,
      user: username,
      password: password,
      secure: secure
    };
  }

  upload(sourcePath, remotePath, permissions) {
    let self = this;
    (async () => {
      try {
        let access = await self.client.access(self.settings);
        let upload = await self.client.upload(fs.createReadStream(sourcePath), remotePath);
        // let permissions = await self.changePermissions(permissions.toString(), remotePath);
        console.log(await self.client.list());
      } catch (err) {
        console.log(err);
      }
      self.client.close();
    })();
  }

  close() {
    this.client.close();
  }

  changePermissions(perms, filepath) {
    let cmd = 'SITE CHMOD ' + perms + ' ' + filepath;
    return this.client.send(cmd, false);
  }

  async getDir() {
    let self = this;
    try {
      let access = await self.client.access(self.settings);
      return await self.client.list();
    } catch (err) {
      console.log(err);
    }
    self.client.close();
  };
}

module.exports = FTPClient;
