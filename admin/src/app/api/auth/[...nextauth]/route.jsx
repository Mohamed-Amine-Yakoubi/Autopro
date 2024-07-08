import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const url = "http://localhost:4000/api/v1/user/SignIn";
        const formData = new URLSearchParams();
        formData.append("Email_user", credentials.email);
        formData.append("MotDePasse_user", credentials.password);

        const res = await fetch(url, {
          method: "POST",
          headers: { Accept: "Application/json" },
          body: formData,
        });
        const data = await res.json();
        if (res.ok) {
 
            return { ...data.user, email: data.user.Email_user, image: null, name: data.user.Nom_user ,role: data.user.Profile_user ,id:data.user.id_user}; // Return user data with appropriate field names
        } else {
          throw new Error("Invalid credentials"); // Throw error if authentication fails
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
  
      // console.log("Session Callback", { session, token });
      session.user = { ...session.user, ...token }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token; 
        token={...user}
      }
      return token;
    },
  },
  pages: {
    SignIn: "/Signin",
  },
 
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
