//@flow

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('place_category')
export class PlaceCategory extends BaseEntity {
  constructor(placeCategory: ?PlaceCategoryType) {
    super();
    if (placeCategory) {
      this.set(placeCategory);
    }
  }

  set = (placeCategory: PlaceCategoryInputType) => {
    this.name = placeCategory.name;
  };

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 30 })
  name: string;
}
