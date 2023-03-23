import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  String appearance = appearanceItems.first.value!;
  final TextEditingController _usernameEditingController =
      TextEditingController(text: "");
  bool setting = false;

  late SharedPreferences prefs;

  @override
  void initState() {
    super.initState();
    SharedPreferences.getInstance().then(
      (value) {
        prefs = value;
        setState(() {
          setting = prefs.getBool("setting") ?? false;
          appearance =
              prefs.getString("appearance") ?? appearanceItems.first.value!;
          _usernameEditingController.text = prefs.getString("username") ?? "";
        });
      },
    );
  }

  void handleAppearanceChanged(String newApperance) {
    prefs.setString("appearance", newApperance).then((value) {
      if (value) {
        setState(() {
          appearance = newApperance;
        });
      }
    });
  }

  void handleUsernameChanged(String newUsername) {
    prefs.setString("username", newUsername).then((value) {
      if (value) {
        setState(() {
          _usernameEditingController.text = newUsername;
        });
      }
    });
  }

  void handleSettingChanged(bool newSetting) {
    prefs.setBool("setting", newSetting).then((value) {
      if (value) {
        setState(() {
          setting = newSetting;
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Settings",
            style: TextStyle(fontSize: 18),
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Apperance"),
              DropdownButton(
                items: appearanceItems,
                onChanged: (value) {
                  if (value != null) {
                    handleAppearanceChanged(value);
                  }
                },
                value: appearance,
              )
            ],
          ),
          Row(
            children: [
              const Text("Enter username"),
              const SizedBox(width: 20),
              Expanded(
                child: TextField(
                  controller: _usernameEditingController,
                  onEditingComplete: () {
                    handleUsernameChanged(_usernameEditingController.text);
                  },
                ),
              )
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text("Some Setting"),
              Switch(
                value: setting,
                onChanged: (value) {
                  handleSettingChanged(value);
                },
              )
            ],
          ),
        ],
      ),
    );
  }

  static List<DropdownMenuItem<String>> appearanceItems = [
    const DropdownMenuItem(
      value: "Default",
      child: Text("Default"),
    ),
    const DropdownMenuItem(
      value: "Dark Mode",
      child: Text("Dark Mode"),
    )
  ];
}
