import { Link } from "react-router-dom";

import {
  FolderIcon,
  TagIcon,
  BadgePercentIcon,
  SparklesIcon,
  UsersIcon,
  BookOpenIcon,
  HelpCircleIcon,
  MapPinIcon,
} from "lucide-react";

const modules = [
  {
    title: "Categories",
    description:
      "Manage product categories",
    icon: FolderIcon,
    path: "/categories",
  },

  {
    title: "Deals",
    description:
      "Manage discounts and promotions",
    icon: BadgePercentIcon,
    path: "/deals",
  },

  {
    title: "New Arrivals",
    description:
      "Manage newly added products",
    icon: SparklesIcon,
    path: "/new-arrivals",
  },

  {
    title: "Experts",
    description:
      "Manage painters and contractors",
    icon: UsersIcon,
    path: "/experts",
  },

  {
    title: "Painting Tips",
    description:
      "Manage painting articles and tips",
    icon: BookOpenIcon,
    path: "/painting-tips",
  },

  {
    title: "FAQs",
    description:
      "Manage help center questions",
    icon: HelpCircleIcon,
    path: "/faqs",
  },

  {
    title: "Store Locations",
    description:
      "Manage branches and stores",
    icon: MapPinIcon,
    path: "/store-locations",
  },

  {
    title: "Featured Products",
    description:
      "Manage featured products",
    icon: TagIcon,
    path: "/featured-products",
  },
];

function ContentManagerPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1 className="text-3xl font-bold">
          Content Manager
        </h1>

        <p className="text-base-content/70">
          Manage all PaintHub content
        </p>
      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((module) => {
          const Icon = module.icon;

          return (
            <Link
              key={module.title}
              to={module.path}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300 hover:border-primary"
            >
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <div>
                    <h2 className="card-title">
                      {module.title}
                    </h2>

                    <p className="text-sm opacity-70">
                      {module.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* QUICK STATS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">
            Categories
          </div>

          <div className="stat-value text-primary">
            --
          </div>
        </div>

        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">
            Deals
          </div>

          <div className="stat-value text-success">
            --
          </div>
        </div>

        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">
            Experts
          </div>

          <div className="stat-value text-info">
            --
          </div>
        </div>

        <div className="stat bg-base-100 rounded-box shadow">
          <div className="stat-title">
            Tips
          </div>

          <div className="stat-value text-warning">
            --
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentManagerPage;