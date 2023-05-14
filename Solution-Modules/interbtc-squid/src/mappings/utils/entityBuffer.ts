import { Entity, Store } from "@subsquid/typeorm-store";

export default class EntityBuffer {
    // type - id - entity
    buffer = new Map<String, Map<String, Entity>>();

    pushEntity(type: string, entity: Entity) {
        if (!this.buffer.has(type)) {
            this.buffer.set(type, new Map([[entity.id, entity]]));
            return;
        }
        this.buffer.get(type)!.set(entity.id, entity);
    }

    async flush(store: Store) {
        // not allowed to mix entities of different types for saving in bulk
        for (const [, nestedMap] of this.buffer) {
            const entities = [...nestedMap.values()];

            await store.save(entities);
        }

        this.buffer.clear();
    }

    getBufferedEntities(type: string): Entity[] {
        if (this.buffer.get(type) === undefined) {
            return [];
        }

        return Array.from(this.buffer.get(type)!.values());
    }

    getBufferedEntityBy(type: string, id: string): Entity | undefined {
        return this.getBufferedEntities(type).find(
            (entity) => entity.id === id
        );
    }
}
