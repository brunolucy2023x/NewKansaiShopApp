import {
  useSSO,
} from "@clerk/clerk-expo";

import {
  useState,
} from "react";

import {
  Alert,
} from "react-native";

/* =========================================================
   TYPES
========================================================= */

type SocialStrategy =
  | "oauth_google"
  | "oauth_apple";

/* =========================================================
   HOOK
========================================================= */

function useSocialAuth() {
  /* =====================================================
     STATE
  ===================================================== */

  const [
    loadingStrategy,

    setLoadingStrategy,
  ] = useState<string | null>(
    null
  );

  /* =====================================================
     CLERK
  ===================================================== */

  const {
    startSSOFlow,
  } = useSSO();

  /* =====================================================
     SOCIAL AUTH
  ===================================================== */

  const handleSocialAuth =
    async (
      strategy: SocialStrategy
    ) => {
      /* ===============================================
         LOADING
      =============================================== */

      setLoadingStrategy(
        strategy
      );

      try {
        /* =============================================
           START FLOW
        ============================================= */

        const {
          createdSessionId,

          setActive,

          signIn,

          signUp,
        } =
          await startSSOFlow(
            {
              strategy,
            }
          );

        /* =============================================
           SESSION CREATED
        ============================================= */

        if (
          createdSessionId &&
          setActive
        ) {
          await setActive({
            session:
              createdSessionId,
          });

          return;
        }

        /* =============================================
           FAILED FLOW
        ============================================= */

        if (
          !signIn &&
          !signUp
        ) {
          throw new Error(
            "Authentication failed"
          );
        }
      } catch (
        error: any
      ) {
        console.error(
          "💥 SOCIAL AUTH ERROR:",
          error
        );

        /* =============================================
           PROVIDER NAME
        ============================================= */

        const provider =
          strategy ===
          "oauth_google"
            ? "Google"
            : "Apple";

        /* =============================================
           ERROR MESSAGE
        ============================================= */

        const message =
          error?.errors?.[0]
            ?.message ||
          `Failed to sign in with ${provider}. Please try again.`;

        /* =============================================
           ALERT
        ============================================= */

        Alert.alert(
          "Authentication Error",

          message
        );
      } finally {
        /* =============================================
           RESET LOADING
        ============================================= */

        setLoadingStrategy(
          null
        );
      }
    };

  /* =====================================================
     RETURN
  ===================================================== */

  return {
    loadingStrategy,

    handleSocialAuth,
  };
}

export default useSocialAuth;