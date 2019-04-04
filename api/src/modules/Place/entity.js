//@flow

import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, RelationId } from 'typeorm';
import { PlaceCategory } from '../PlaceCategory/entity';

@Entity('place')
export class Place extends BaseEntity {
  constructor(place: ?PlaceInputType) {
    super();
    if (place) {
      this.set(place);
    }
  }

  set = (place: PlaceInputType) => {
    this.name = place.name;
    this.address = place.address;
    this.latitude = place.latitude;
    this.longitude = place.longitude;
    this.category = place.category && place.category.id ? place.category : null;
  };

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  address: string;

  @Column('numeric')
  latitude: number;

  @Column('numeric')
  longitude: number;

  @ManyToOne(type => PlaceCategory, placeCategory => placeCategory.places, { onDelete: 'SET NULL' })
  category: ?PlaceCategoryType;

  @RelationId(place => place.category)
  categoryId: ?string;
}
