// Service để xử lý các tác vụ liên quan đến authentication
// Sử dụng token này để gọi API backend

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {
    // Load token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("authToken");
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Lưu token vào localStorage
  public setToken(token: string): void {
    this.token = token;
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  }

  // Lấy token hiện tại
  public getToken(): string | null {
    return this.token;
  }

  // Xóa token khi đăng xuất
  public clearToken(): void {
    this.token = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  }

  // Tạo headers với token để gọi API
  public getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Helper function để gọi API với authentication
  public async authenticatedFetch(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    const headers = {
      ...this.getAuthHeaders(),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Nếu token hết hạn (401), có thể xử lý refresh token ở đây
    if (response.status === 401) {
      this.clearToken();
      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/signin";
      }
    }

    return response;
  }
}

export default AuthService.getInstance();
