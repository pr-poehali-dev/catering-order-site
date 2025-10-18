import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [selectedDishes, setSelectedDishes] = useState<{ name: string; price: number; quantity: number }[]>([]);

  const menuCategories = [
    {
      category: 'Закуски',
      items: [
        { name: 'Тартар из лосося с авокадо', price: 2500, description: 'Свежий норвежский лосось, крем из авокадо, трюфельное масло' },
        { name: 'Карпаччо из мраморной говядины', price: 2800, description: 'Тончайшие ломтики премиальной говядины с рукколой и пармезаном' },
        { name: 'Устричный сет', price: 4500, description: 'Отборные устрицы Fine de Claire с лимоном и мигнонеттом' },
      ],
    },
    {
      category: 'Основные блюда',
      items: [
        { name: 'Стейк Рибай', price: 5500, description: 'Премиальный стейк на углях с трюфельным маслом и овощами гриль' },
        { name: 'Дорадо с белым соусом', price: 4200, description: 'Свежая дорадо запеченная в духовке с соусом beurre blanc' },
        { name: 'Ризотто с белыми грибами', price: 3200, description: 'Классическое ризотто с белыми грибами и пармезаном' },
      ],
    },
    {
      category: 'Десерты',
      items: [
        { name: 'Тирамису классический', price: 1200, description: 'Авторский рецепт с маскарпоне и амаретто' },
        { name: 'Панакота с ягодами', price: 1000, description: 'Нежная панакота с соусом из сезонных ягод' },
        { name: 'Фондан из бельгийского шоколада', price: 1400, description: 'Тёплый шоколадный десерт с ванильным мороженым' },
      ],
    },
  ];

  const services = [
    { title: 'Корпоративные мероприятия', icon: 'Briefcase', description: 'Организация питания для деловых встреч, конференций и корпоративов' },
    { title: 'Свадебные банкеты', icon: 'Heart', description: 'Индивидуальное меню и сервис для вашего особенного дня' },
    { title: 'Частные ужины', icon: 'UtensilsCrossed', description: 'Приватный шеф и персональное обслуживание на дому' },
    { title: 'Фуршеты и коктейли', icon: 'Wine', description: 'Элегантные кейтеринговые решения для светских мероприятий' },
  ];

  const addDish = (name: string, price: number) => {
    const existing = selectedDishes.find(d => d.name === name);
    if (existing) {
      setSelectedDishes(selectedDishes.map(d => 
        d.name === name ? { ...d, quantity: d.quantity + 1 } : d
      ));
    } else {
      setSelectedDishes([...selectedDishes, { name, price, quantity: 1 }]);
    }
    toast({
      title: 'Добавлено в заказ',
      description: name,
    });
  };

  const removeDish = (name: string) => {
    setSelectedDishes(selectedDishes.filter(d => d.name !== name));
  };

  const getTotalPrice = () => {
    return selectedDishes.reduce((sum, dish) => sum + dish.price * dish.quantity, 0);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/files/331143e4-80fd-4e9f-a0a7-d3d12a5c06f4.jpg" alt="GREENPLATE" className="h-12 w-12 object-contain" />
              <span className="text-2xl font-bold text-primary">GREENPLATE</span>
            </div>
            <div className="hidden md:flex gap-8">
              <button onClick={() => scrollToSection('home')} className="hover-gold font-medium">Главная</button>
              <button onClick={() => scrollToSection('menu')} className="hover-gold font-medium">Меню</button>
              <button onClick={() => scrollToSection('services')} className="hover-gold font-medium">Услуги</button>
              <button onClick={() => scrollToSection('order')} className="hover-gold font-medium">Заказать</button>
              <button onClick={() => scrollToSection('about')} className="hover-gold font-medium">О нас</button>
              <button onClick={() => scrollToSection('contacts')} className="hover-gold font-medium">Контакты</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 min-h-screen flex items-center">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary">GREENPLATE</h1>
          <p className="text-xl md:text-2xl mb-4 text-gray-300">Премиальный кейтеринг</p>
          <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-2xl mx-auto">
            Высокая кухня и безупречный сервис для ваших особенных событий
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => scrollToSection('menu')} size="lg" className="bg-primary text-black hover:bg-primary/90 font-semibold text-lg px-8">
              Посмотреть меню
            </Button>
            <Button onClick={() => scrollToSection('order')} size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black font-semibold text-lg px-8">
              Сделать заказ
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-4 bg-gradient-to-b from-black to-secondary">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-primary animate-slide-up">Меню</h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Изысканные блюда от наших шеф-поваров</p>
          
          {menuCategories.map((category, idx) => (
            <div key={idx} className="mb-16 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
              <h3 className="text-3xl font-bold mb-8 text-primary border-b border-primary/30 pb-3">{category.category}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIdx) => (
                  <Card key={itemIdx} className="bg-secondary/50 border-primary/20 hover:border-primary/50 transition-all hover:scale-105">
                    <CardHeader>
                      <CardTitle className="text-primary text-xl">{item.name}</CardTitle>
                      <CardDescription className="text-gray-400">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                        <Button onClick={() => addDish(item.name, item.price)} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Добавить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-black">
        <div className="container mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-primary animate-slide-up">Услуги</h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Полный спектр кейтеринговых решений</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="bg-secondary/30 border-primary/20 hover:border-primary transition-all text-center animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Icon name={service.icon as any} size={32} className="text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-primary text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="py-20 px-4 bg-gradient-to-b from-black to-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-primary animate-slide-up">Заказать</h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Оформите заказ и мы свяжемся с вами в ближайшее время</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-secondary/50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDishes.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">Добавьте блюда из меню</p>
                ) : (
                  <div className="space-y-4">
                    {selectedDishes.map((dish, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-primary/10 pb-3">
                        <div className="flex-1">
                          <p className="font-medium">{dish.name}</p>
                          <p className="text-sm text-gray-400">Количество: {dish.quantity}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-primary">{dish.price * dish.quantity} ₽</span>
                          <Button onClick={() => removeDish(dish.name)} variant="ghost" size="icon" className="text-red-500 hover:text-red-400">
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Separator className="bg-primary/20" />
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Итого:</span>
                      <span className="text-primary">{getTotalPrice()} ₽</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-secondary/50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Контактные данные</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  toast({
                    title: 'Заказ отправлен!',
                    description: 'Мы свяжемся с вами в ближайшее время',
                  });
                }}>
                  <div>
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Ваше имя" required className="bg-black/50 border-primary/30" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required className="bg-black/50 border-primary/30" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required className="bg-black/50 border-primary/30" />
                  </div>
                  <div>
                    <Label htmlFor="event-type">Тип мероприятия</Label>
                    <Select>
                      <SelectTrigger className="bg-black/50 border-primary/30">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Корпоративное</SelectItem>
                        <SelectItem value="wedding">Свадьба</SelectItem>
                        <SelectItem value="private">Частный ужин</SelectItem>
                        <SelectItem value="cocktail">Фуршет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="guests">Количество гостей</Label>
                    <Input id="guests" type="number" placeholder="10" min="1" required className="bg-black/50 border-primary/30" />
                  </div>
                  <div>
                    <Label htmlFor="date">Дата мероприятия</Label>
                    <Input id="date" type="date" required className="bg-black/50 border-primary/30" />
                  </div>
                  <div>
                    <Label htmlFor="comment">Комментарий</Label>
                    <Textarea id="comment" placeholder="Особые пожелания..." className="bg-black/50 border-primary/30" />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/90 font-semibold text-lg">
                    Отправить заказ
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-primary animate-slide-up">О нас</h2>
          <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              <span className="text-primary font-semibold">GREENPLATE</span> — это премиальная кейтеринговая компания, 
              специализирующаяся на организации мероприятий высшего уровня.
            </p>
            <p>
              Наша команда состоит из опытных шеф-поваров, обученных в лучших ресторанах мира, 
              и профессиональных менеджеров, которые сделают ваше мероприятие незабываемым.
            </p>
            <p>
              Мы используем только свежайшие продукты премиум-качества и создаём индивидуальное меню 
              для каждого клиента, учитывая все пожелания и предпочтения.
            </p>
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-gray-400">Мероприятий</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">15</div>
                <p className="text-gray-400">Лет опыта</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-gray-400">Довольных клиентов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20 px-4 bg-gradient-to-b from-black to-secondary">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 text-primary animate-slide-up">Контакты</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Icon name="MapPin" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-primary">Адрес</h3>
                  <p className="text-gray-300">г. Москва, ул. Примерная, д. 1</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Icon name="Phone" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-primary">Телефон</h3>
                  <p className="text-gray-300">+7 (495) 123-45-67</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-primary">Email</h3>
                  <p className="text-gray-300">info@greenplate.ru</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Icon name="Clock" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-primary">Режим работы</h3>
                  <p className="text-gray-300">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>
            </div>

            <Card className="bg-secondary/50 border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Напишите нам</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  toast({
                    title: 'Сообщение отправлено!',
                    description: 'Мы ответим вам в ближайшее время',
                  });
                }}>
                  <div>
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input id="contact-name" placeholder="Ваше имя" required className="bg-black/50 border-primary/30" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="your@email.com" required className="bg-black/50 border-primary/30" />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Сообщение</Label>
                    <Textarea id="contact-message" placeholder="Ваше сообщение..." required className="bg-black/50 border-primary/30 h-32" />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-black hover:bg-primary/90 font-semibold">
                    Отправить
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black border-t border-primary/20">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="https://cdn.poehali.dev/files/331143e4-80fd-4e9f-a0a7-d3d12a5c06f4.jpg" alt="GREENPLATE" className="h-10 w-10 object-contain" />
            <span className="text-2xl font-bold text-primary">GREENPLATE</span>
          </div>
          <p className="text-gray-400">© 2025 GREENPLATE. Премиальный кейтеринг высшего уровня</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
