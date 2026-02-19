import { GitHubBanner, Refine, } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Route, Routes,Outlet } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./Provider/data"; import  Dashboard  from "./pages/Dashboard"; //
import { BookOpen, Home } from "lucide-react";
import { ThemedLayout } from "@refinedev/antd";

import Subjectslist from "./pages/subject/list";
import SubjectCreate from "./pages/subject/create";

function App() {
  return (
    <BrowserRouter>
      
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "8BJFOJ-7F6vKD-pJzury",
              }}
              resources={[
                  {
                      name:"dashboard",list:"/",
                      meta:{label:"home",icon:<Home/>}
                  },
                  {
                    name:"subjects",
                    list:"/subjects",
                    create:"/subjects/create",
                    meta:{label:"subjects",icon:<BookOpen/>}
                  }
              ]}

            >
                <Routes>
                    <Route
                        element={
                            <ThemedLayout>
                                <Outlet />
                            </ThemedLayout>
                        }
                    >
                        {/* Dashboard ab Layout ke andar nazar ayega */}
                        <Route index element={<Dashboard />} />
                    </Route>
                    <Route path="/subjects" element={<Subjectslist />} />
                    <Route path="/subjects/create" element={<SubjectCreate />} />
                </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
