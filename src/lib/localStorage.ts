// localStorage utility functions for cart and wishlist management

export interface LocalCartItem {
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  addedAt: string;
}

export interface LocalWishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  productPrice: number;
  addedAt: string;
}

const CART_STORAGE_KEY = 'guest_cart';
const WISHLIST_STORAGE_KEY = 'guest_wishlist';

// Cart localStorage functions
export const getLocalCart = (): LocalCartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

export const saveLocalCart = (cart: LocalCartItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const addToLocalCart = (item: Omit<LocalCartItem, 'addedAt'>): void => {
  const cart = getLocalCart();
  const existingItemIndex = cart.findIndex(cartItem => cartItem.productId === item.productId);
  
  if (existingItemIndex > -1) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item
    cart.push({
      ...item,
      addedAt: new Date().toISOString(),
    });
  }
  
  saveLocalCart(cart);
};

export const removeFromLocalCart = (productId: string): void => {
  const cart = getLocalCart();
  const updatedCart = cart.filter(item => item.productId !== productId);
  saveLocalCart(updatedCart);
};

export const updateLocalCartQuantity = (productId: string, quantity: number): void => {
  const cart = getLocalCart();
  const itemIndex = cart.findIndex(item => item.productId === productId);
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      removeFromLocalCart(productId);
    } else {
      cart[itemIndex].quantity = quantity;
      saveLocalCart(cart);
    }
  }
};

export const clearLocalCart = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_STORAGE_KEY);
};

export const getLocalCartCount = (): number => {
  const cart = getLocalCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Wishlist localStorage functions
export const getLocalWishlist = (): LocalWishlistItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const wishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error);
    return [];
  }
};

export const saveLocalWishlist = (wishlist: LocalWishlistItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

export const addToLocalWishlist = (item: Omit<LocalWishlistItem, 'addedAt'>): boolean => {
  const wishlist = getLocalWishlist();
  const existingItem = wishlist.find(wishlistItem => wishlistItem.productId === item.productId);
  
  if (existingItem) {
    return false; // Item already in wishlist
  }
  
  wishlist.push({
    ...item,
    addedAt: new Date().toISOString(),
  });
  
  saveLocalWishlist(wishlist);
  return true;
};

export const removeFromLocalWishlist = (productId: string): void => {
  const wishlist = getLocalWishlist();
  const updatedWishlist = wishlist.filter(item => item.productId !== productId);
  saveLocalWishlist(updatedWishlist);
};

export const clearLocalWishlist = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(WISHLIST_STORAGE_KEY);
};

export const getLocalWishlistCount = (): number => {
  return getLocalWishlist().length;
};

export const isInLocalWishlist = (productId: string): boolean => {
  const wishlist = getLocalWishlist();
  return wishlist.some(item => item.productId === productId);
};

// Migration functions for when user logs in
export const migrateLocalCartToUser = async (userId: string): Promise<void> => {
  const localCart = getLocalCart();
  if (localCart.length === 0) return;

  try {
    for (const item of localCart) {
      await fetch('/api/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: item.productId,
          quantity: item.quantity,
          productName: item.productName,
          productImage: item.productImage,
          productPrice: item.productPrice,
          userId,
        }),
      });
    }
    clearLocalCart();
  } catch (error) {
    console.error('Error migrating cart to user:', error);
  }
};

export const migrateLocalWishlistToUser = async (userId: string): Promise<void> => {
  const localWishlist = getLocalWishlist();
  if (localWishlist.length === 0) return;

  try {
    for (const item of localWishlist) {
      await fetch('/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          userId,
        }),
      });
    }
    clearLocalWishlist();
  } catch (error) {
    console.error('Error migrating wishlist to user:', error);
  }
};
