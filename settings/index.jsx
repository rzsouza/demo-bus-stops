function mySettings(props) {
  return (
    <Page>
      <Section title={<Text bold align="center">Schedule</Text>}>
        <TextInput
          title="Add a stop"
          label="Stop Number - 1"
          settingsKey="stop_num_setting_0"
          placeholder="Type number"
        />
        <TextInput
          title="Add a stop"
          label="Optional Stop Name - 1"
          settingsKey="stop_name_setting_0"
          placeholder="Type number"
        />
        <TextInput
          title="Add a stop"
          label="Stop Number - 2"
          settingsKey="stop_num_setting_1"
          placeholder="Type number"
        />
        <TextInput
          title="Add a stop"
          label="Optional Stop Name - 2"
          settingsKey="stop_name_setting_1"
          placeholder="Type number"
        />
        <TextInput
          title="Add a stop"
          label="Stop Number - 3"
          settingsKey="stop_num_setting_2"
          placeholder="Type number"
        />
        <TextInput
          title="Add a stop"
          label="Optional Stop Name - 3"
          settingsKey="stop_name_setting_2"
          placeholder="Type number"
        />
        <TextInput
          title="Add a stop"
          label="Stop Number - 4"
          settingsKey="stop_num_setting_3"
          placeholder="Type number"
        />
        <TextInput
          title="Add a stop"
          label="Optional Stop Name - 4"
          settingsKey="stop_num_setting_3"
          placeholder="Type number"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);