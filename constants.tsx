import { PrincipleData, PrincipleType, LearnMoreLink } from './types';

export const PRINCIPLES: PrincipleData[] = [
  {
    id: PrincipleType.SRP,
    title: "Single Responsibility",
    subtitle: "Do one thing well",
    pupName: "Chase",
    officialDef: "Every module or class should have responsibility over a single part of the functionality provided by the software.",
    whyItMatters: "In a rescue, clarity is life. If Chase is trying to navigate, sniff out clues, AND repair the fire truck at the same time, he will inevitably fail at one. Code works the same: classes with too many jobs become 'God Objects' that are terrifying to modify because a change in one 'job' breaks the others.",
    pupAnalogy: "Chase handles the law and tracking. Marshall handles fires. When the mission starts, Ryder doesn't ask one pup to do everything. Each pup has a specialized 'Pup Pack'. If Chase started carrying a fire hose, his tracking gear wouldn't fit!",
    pragmaticHint: "If you can't describe what a class does in one short sentence without using the word 'and', it has too many responsibilities.",
    visualSummary: "One Pup, One Pack, One Purpose.",
    signsOfFailure: [
      "The class name contains 'Manager', 'Util', or 'Service' and is over 500 lines.",
      "A change in the database schema requires changing logic in your UI-related class.",
      "The class has too many imports/dependencies from unrelated domains.",
      "Multiple team members are constantly editing the same file for different reasons."
    ],
    learnMoreLinks: [
      {
        title: "Single Responsibility Principle",
        url: "https://en.wikipedia.org/wiki/Single-responsibility_principle",
        description: "Understanding SRP and its importance"
      },
      {
        title: "SRP: The Single Responsibility Principle",
        url: "https://web.archive.org/web/20150202200348/http://www.objectmentor.com/resources/articles/srp.pdf",
        description: "Original paper by Robert C. Martin (PDF)"
      },
      {
        title: "Understanding SOLID: SRP",
        url: "https://stackify.com/solid-design-principles/",
        description: "Practical examples and anti-patterns"
      }
    ],
    pupIcon: "shield",
    color: "text-blue-600",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: PrincipleType.OCP,
    title: "Open-Closed",
    subtitle: "Open for extension, closed for modification",
    pupName: "Everest",
    officialDef: "Objects or entities should be open for extension, but closed for modification. This means you should be able to add new functionality without changing existing code.",
    whyItMatters: "Adventure Bay grows! One day we need a snow rescue, the next a jungle rescue. If we had to rebuild the Lookout Tower every time a new pup joined, we'd never get anything done. We need a system where we can 'plug in' new pups without touching the foundation.",
    pupAnalogy: "The Lookout Tower slide is 'Closed'. We don't rebuild it. But it is 'Open' to any pup who can slide down it! Whether it's Skye with her flight pack or Zuma with his scuba gear, the slide works for everyone without modification.",
    pragmaticHint: "The 'Strategy Pattern' is the best friend of the Open/Closed Principle.",
    visualSummary: "Don't change the motor, just swap the attachments.",
    signsOfFailure: [
      "Giant 'switch' or 'if-else' chains checking for types.",
      "Adding a new feature requires opening and editing 5 different existing files.",
      "You are afraid to add a feature because it might break the 'core' logic.",
      "You find yourself copy-pasting code to handle a slightly different variation of a task."
    ],
    learnMoreLinks: [
      {
        title: "Open-Closed Principle",
        url: "https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle",
        description: "Understanding OCP and its evolution"
      },
      {
        title: "Strategy Pattern Tutorial",
        url: "https://refactoring.guru/design-patterns/strategy",
        description: "Implementing OCP with the Strategy pattern"
      },
      {
        title: "SOLID: Open-Closed Principle",
        url: "https://stackify.com/solid-design-open-closed-principle/",
        description: "Practical examples and implementation"
      }
    ],
    pupIcon: "plus",
    color: "text-green-600",
    bgLight: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    id: PrincipleType.LSP,
    title: "Liskov Substitution",
    subtitle: "Keep your promises",
    pupName: "Ryder",
    officialDef: "If S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of the program.",
    whyItMatters: "Ryder needs to know that any 'Vehicle' he calls to the bridge can actually cross it. If a 'Vehicle' is created that can only move on snow, it shouldn't be used where a generic Vehicle is expected. If it breaks the rules of the parent, it breaks the mission.",
    pupAnalogy: "Ryder tells all Pups: 'Any vehicle in the fleet must be able to respond to a siren.' If the Snowplow is a 'Vehicle' but it can't start unless it's freezing cold, it's not a true substitute for a Fleet Vehicle during a summer mission!",
    pragmaticHint: "If it looks like a duck and quacks like a duck but needs batteries, it probably violates LSP.",
    visualSummary: "Respect the Contract. Subclasses must keep their parent's promises.",
    signsOfFailure: [
      "Methods in a subclass throw 'NotSupportedException'.",
      "The calling code has to check 'instanceof' before calling a method.",
      "A subclass 'weakens' the preconditions of the parent (e.g., accepts fewer inputs).",
      "A subclass 'strengthens' the postconditions (e.g., returns something unexpected)."
    ],
    learnMoreLinks: [
      {
        title: "Liskov Substitution Principle",
        url: "https://en.wikipedia.org/wiki/Liskov_substitution_principle",
        description: "Understanding behavioral subtyping and LSP"
      },
      {
        title: "SOLID Principles: LSP",
        url: "https://stackify.com/solid-design-liskov-substitution-principle/",
        description: "Common violations with practical solutions"
      },
      {
        title: "LSP in Depth",
        url: "https://www.oodesign.com/liskov-s-substitution-principle",
        description: "Design patterns and LSP compliance"
      }
    ],
    pupIcon: "alert",
    color: "text-purple-600",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    id: PrincipleType.ISP,
    title: "Interface Segregation",
    subtitle: "Don't force useless skills",
    pupName: "Skye",
    officialDef: "No client should be forced to depend on methods it does not use. Large interfaces should be split into smaller, more specific ones.",
    whyItMatters: "Skye's helicopter pack is lightweight for a reason. If her pack was forced to carry Marshall's heavy fire hose just because it's a 'Standard Issue Pup Pack', she wouldn't be able to fly. Pups (and classes) should only carry the tools they actually need for their specific job.",
    pupAnalogy: "Skye needs 'FlightGear'. Marshall needs 'FireGear'. Both are 'Pup Gear', but Skye shouldn't have to know how to prime a water pump just to use her wings! We keep the gear specs separate so they stay light and agile.",
    pragmaticHint: "Large interfaces are 'polluted' interfaces. Clean them up by splitting them.",
    visualSummary: "Pack only what you use. Light code is fast code.",
    signsOfFailure: [
      "You implement an interface but leave several methods empty or throwing errors.",
      "A class has to import 10 things just to implement one small interface.",
      "The interface has a name like 'EverythingHandler' or 'GlobalInterface'.",
      "Changes to a method you don't even use force you to recompile/redeploy your module."
    ],
    learnMoreLinks: [
      {
        title: "Interface Segregation Principle",
        url: "https://en.wikipedia.org/wiki/Interface_segregation_principle",
        description: "Understanding ISP and fat interfaces"
      },
      {
        title: "ISP in Practice",
        url: "https://stackify.com/interface-segregation-principle/",
        description: "Real-world examples of interface segregation"
      },
      {
        title: "Role Interfaces Pattern",
        url: "https://martinfowler.com/bliki/RoleInterface.html",
        description: "Martin Fowler on client-specific interfaces"
      }
    ],
    pupIcon: "list",
    color: "text-pink-600",
    bgLight: "bg-pink-50",
    borderColor: "border-pink-200"
  },
  {
    id: PrincipleType.DIP,
    title: "Dependency Inversion",
    subtitle: "Depend on abstractions",
    pupName: "Ryder",
    officialDef: "High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.",
    whyItMatters: "Ryder doesn't care *which* pup puts out the fire, he just cares that the *fire is put out*. If the mission logic specifically said 'Call Marshall', and Marshall was on vacation, the town would burn. By depending on the concept of a 'Firefighter', Ryder can send anyone who fits the role.",
    pupAnalogy: "Ryder's command tablet doesn't talk to 'Marshall's Specific Radio'. It talks to the 'Rescue Frequency'. Any pup can tune into that frequency and receive orders. Ryder is decoupled from the specific pup!",
    pragmaticHint: "Don't call us, we'll call you. (The Hollywood Principle of Dependency Injection).",
    visualSummary: "Connect to the Interface, not the Wire.",
    signsOfFailure: [
      "You use the 'new' keyword inside your business logic to create helper objects.",
      "You can't unit test a class without having a real database or internet connection.",
      "High-level 'Manager' classes are full of low-level 'SQL' or 'HTTP' details.",
      "Changing your logger requires editing 50 business logic files."
    ],
    learnMoreLinks: [
      {
        title: "Dependency Inversion Principle",
        url: "https://en.wikipedia.org/wiki/Dependency_inversion_principle",
        description: "Understanding DIP and abstraction layers"
      },
      {
        title: "Dependency Injection Tutorial",
        url: "https://martinfowler.com/articles/injection.html",
        description: "Martin Fowler's comprehensive guide to DI"
      },
      {
        title: "SOLID Design: DIP",
        url: "https://stackify.com/dependency-inversion-principle/",
        description: "Practical implementation patterns"
      }
    ],
    pupIcon: "share",
    color: "text-orange-600",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200"
  }
];
