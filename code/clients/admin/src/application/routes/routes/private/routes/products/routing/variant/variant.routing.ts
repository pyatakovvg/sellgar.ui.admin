import { Router } from '@sellgar/app/react';
import { variantCreateRoute } from './routes/create';
import { variantReviewRoute } from './routes/review';
import { variantModifyRoute } from './routes/modify';

export const variantRouting = new Router({ routes: [variantCreateRoute, variantModifyRoute, variantReviewRoute] });
