import feed from "../feeds";
import { Category } from "../lookups";
import { generateRandomInteger } from "../utils";

export type CreateCategoryOptions = Partial<Omit<Category, 'id'>>;

export type DetailedCategory = Category & {
    children: Category[]
}

export async function createCategory(options:CreateCategoryOptions): Promise<Category> {
    return feed.categories.insert({
        id: generateRandomInteger(),
        parent: options.parent || -1,
        title: options.title,
        description: options.description
    })
}

export async function getCategory(id:number): Promise<Category> {
    return feed.categories.findOne({
        id: id,
    })
}

export async function getAllCategories(): Promise<Category[]> {
    return feed.categories.find({
        parent: -1,
    })
}

export async function getCategoryDetailed(id:number): Promise<DetailedCategory> {
    const tlc = await getCategory(id);
    return getDetailedCategoryFrom(tlc);
}

export async function getAllCategoriesDetailed(): Promise<DetailedCategory[]> {
    const topLevelCategories: Category[] = await getAllCategories()
    return topLevelCategories.map(getDetailedCategoryFrom);
}

export function getDetailedCategoryFrom(tlc: Category): DetailedCategory {
    const underlyingCategories = feed.categories.find({
        parent: tlc.id,
    })
    return {
        ...tlc,
        children: underlyingCategories
    }
}
