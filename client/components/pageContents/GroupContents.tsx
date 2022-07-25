import AddGroup from "components/AddGroup";
import GroupsList from "components/GroupsList";
import useModel from "customHooks.tsx/useModel";

function GroupContents({ groups = [] }) {
	const { Model, modelProps, itemData, setItemData } = useModel();

	return (
		<>
			<Model title="Add Group">
				<AddGroup onClose={modelProps.onClose} {...itemData} />
			</Model>
			<GroupsList groupsItems={groups} setGroupItemData={setItemData} />
		</>
	);
}

export default GroupContents;
