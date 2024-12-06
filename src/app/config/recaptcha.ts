interface GrecaptchaEnterprise {
  ready(callback: () => void): void;
  execute(siteKey: string, options: { action: string }): Promise<string>;
}

declare const grecaptcha: {
  enterprise: GrecaptchaEnterprise;
};


function onClick(e: Event): void {
  e.preventDefault();

  grecaptcha.enterprise.ready(async () => {
    const token: string = await grecaptcha.enterprise.execute(
      '6LeC_pIqAAAAALAepl_7Ikbc_R4wXt6kTtVRH2mN',
      { action: 'LOGIN' }
    );
    // Додатковий код для роботи з `token` (за потреби)
  });
}
