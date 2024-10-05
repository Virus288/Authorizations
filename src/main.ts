class App {
  init(): void {
    this.handleInit().catch((err) => {
      console.info('Got err while initializing app', err);
    });
  }

  private async handleInit(): Promise<void> {
    return new Promise((resolve) => {
      console.info('Server', 'Server started');
      resolve();
    });
  }
}

const app = new App();
app.init();
