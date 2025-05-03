import React from "react";
import Icon from "@/components/ui/Icon";

interface MachineListData {
  title: string;
  description: string;
  machines: Array<{ id: string; name: string; description: string }>;
}

export function EditableMachineListBlock({
  title,
  description,
  machines = [],
  onChange,
}: {
  title: string;
  description: string;
  machines: Array<{ id: string; name: string; description: string }>;
  onChange: (data: Partial<MachineListData>) => void;
}) {
  const addMachine = () => {
    onChange({
      machines: [
        ...machines,
        { id: `machine-${Date.now()}`, name: "New Machine", description: "" },
      ],
    });
  };

  const updateMachine = (id: string, field: string, value: string) => {
    onChange({
      machines: machines.map((machine) =>
        machine.id === id ? { ...machine, [field]: value } : machine
      ),
    });
  };

  const removeMachine = (id: string) => {
    onChange({
      machines: machines.filter((machine) => machine.id !== id),
    });
  };

  return (
    <div className="editable-machine-list p-6 bg-gray-50 rounded">
      <div className="mb-4">
        <label className="block mb-1">Section Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => onChange({ description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div className="machines-list mt-6">
        <h4 className="text-lg font-medium mb-3">Machines</h4>

        {machines.map((machine) => (
          <div
            key={machine.id}
            className="machine-item mb-4 p-4 border rounded bg-white"
          >
            <div className="flex justify-between">
              <div className="flex-grow">
                <input
                  type="text"
                  value={machine.name}
                  onChange={(e) =>
                    updateMachine(machine.id, "name", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Machine name"
                />

                <textarea
                  value={machine.description}
                  onChange={(e) =>
                    updateMachine(machine.id, "description", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  rows={2}
                  placeholder="Machine description"
                />
              </div>
              <button
                onClick={() => removeMachine(machine.id)}
                className="ml-2 text-red-500"
              >
                <Icon name="trash" />
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addMachine}
          className="mt-2 flex items-center text-blue-500"
        >
          <Icon name="plus" />
          Add Machine
        </button>
      </div>
    </div>
  );
}
