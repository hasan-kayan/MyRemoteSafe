import sys
from PyQt5.QtWidgets import QApplication, QLabel, QVBoxLayout, QPushButton, QWidget, QComboBox
import os

class GitManager(QWidget):
    def __init__(self):
        super().__init__()

        self.initUI()

    def initUI(self):
        layout = QVBoxLayout()

        # Başlık
        label = QLabel('Select Git Account')
        layout.addWidget(label)

        # Git hesaplarını seçmek için bir combobox
        self.git_accounts = QComboBox()
        self.git_accounts.addItem("GitHub - Account 1")
        self.git_accounts.addItem("GitHub - Account 2")
        self.git_accounts.addItem("GitLab - Account")
        layout.addWidget(self.git_accounts)

        # Hesap seçildiğinde uygulanacak işlem için bir buton
        self.switch_button = QPushButton("Switch Account", self)
        self.switch_button.clicked.connect(self.switch_account)
        layout.addWidget(self.switch_button)

        # Mevcut yapılandırmayı göstermek için bir etiket
        self.current_config = QLabel('Current Account: None', self)
        layout.addWidget(self.current_config)

        self.setLayout(layout)
        self.setWindowTitle('Git Account Manager')

    def switch_account(self):
        selected_account = self.git_accounts.currentText()

        # Hesap bilgilerini ayarla ve SSH anahtarını kullan
        if "Account 1" in selected_account:
            self.set_git_account("~/.ssh/id_rsa_account1", "account1@example.com")
        elif "Account 2" in selected_account:
            self.set_git_account("~/.ssh/id_rsa_account2", "account2@example.com")
        elif "GitLab" in selected_account:
            self.set_git_account("~/.ssh/id_rsa_gitlab", "gitlab@example.com")

        self.current_config.setText(f'Current Account: {selected_account}')

    def set_git_account(self, ssh_key_path, email):
        # SSH anahtarını ekle
        os.system(f"ssh-add {ssh_key_path}")
        
        # Git kullanıcı ayarlarını güncelle
        os.system(f"git config --global user.email '{email}'")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    manager = GitManager()
    manager.show()
    sys.exit(app.exec_())
