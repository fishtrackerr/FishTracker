package com.fishtrackerr.fishtracker;

import android.os.Bundle;
import androidx.core.splashscreen.SplashScreen;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Install before super so the splash theme hands off cleanly to the WebView.
        SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);
    }
}
