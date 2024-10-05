class App {
  init(): void {
    this.handleInit().catch((err) => {
      console.error("Got err while initializing app", err);
    });
  }

  private async handleInit(): Promise<void> {
    return new Promise(resolve => {
      console.log('Server', 'Server started');
    })
  }
}

const app = new App();
app.init();
